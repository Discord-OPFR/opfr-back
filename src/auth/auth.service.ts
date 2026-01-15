import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { ERROR_TYPES } from './schemas/auth.schema';
import { CryptoService } from './storage/crypto.service';
import { StorageService } from './storage/storage.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly storageService: StorageService,
    private readonly cryptoService: CryptoService,
  ) {}

  async getToken(code: string, redirect: string): Promise<string> {
    const clientId = this.configService.get<string>('DISCORD_CLIENT_ID');
    const clientSecret = this.configService.get<string>(
      'DISCORD_CLIENT_SECRET',
    );

    if (!clientId || !clientSecret) throw new InternalServerErrorException();

    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      code,
      redirect_uri: decodeURIComponent(redirect) + '/api/auth/discord/callback',
    });

    const response = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new BadGatewayException({
        message: 'Failed to fetch external resource',
        status: response.status,
        response: result,
      });
    }

    return result.access_token;
  }

  generateAccessToken(userId: string): string {
    const JWT_SECRET = this.configService.get<string>('JWT_SECRET');

    if (!JWT_SECRET) throw new InternalServerErrorException();

    return this.jwtService.sign(
      { userId },
      {
        secret: JWT_SECRET,
        expiresIn: '15m',
      },
    );
  }

  generateRefreshToken(userId: string): string {
    const REFRESH_JWT_SECRET =
      this.configService.get<string>('REFRESH_JWT_SECRET');

    if (!REFRESH_JWT_SECRET) throw new InternalServerErrorException();

    return this.jwtService.sign(
      { userId },
      {
        secret: REFRESH_JWT_SECRET,
        expiresIn: '30d',
      },
    );
  }

  async storeAuth(
    userId: string,
    refreshToken: string,
    discordToken: string,
  ): Promise<void> {
    const hash = await bcrypt.hash(refreshToken, 10);
    const refreshAlreadyExists = await this.storageService.exists(userId);
    const encryptedToken = this.cryptoService.encrypt(discordToken);

    if (refreshAlreadyExists) {
      await this.storageService.updateAuth(userId, {
        $set: { refreshToken: refreshToken },
      });
    } else {
      await this.storageService.create({
        userId,
        discordToken: encryptedToken,
        refreshToken: hash,
      });
    }
  }

  async verifyRefreshToken(refreshToken: string): Promise<string> {
    const REFRESH_JWT_SECRET =
      this.configService.get<string>('REFRESH_JWT_SECRET');

    if (!REFRESH_JWT_SECRET) throw new InternalServerErrorException();

    try {
      const payload = await this.jwtService.verify(refreshToken, {
        secret: REFRESH_JWT_SECRET,
      });

      return payload.userId;
    } catch {
      throw new UnauthorizedException(ERROR_TYPES.REFRESH_EXPIRED);
    }
  }

  async rotateToken(userId: string, refreshToken: string) {
    const auth = await this.storageService.findByUserId(userId);

    if (!auth) throw new UnauthorizedException(ERROR_TYPES.REFRESH_EXPIRED);

    const isValid = await bcrypt.compare(refreshToken, auth.refreshToken);

    if (!isValid) throw new UnauthorizedException(ERROR_TYPES.REFRESH_EXPIRED);

    const newRefreshToken = this.generateRefreshToken(userId);
    await this.storageService.updateAuth(userId, {
      $set: { refreshToken: newRefreshToken },
    });

    return newRefreshToken;
  }
}
