import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { Auth } from './schemas/auth.schema';
import { StorageService } from './storage/storage.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly storageService: StorageService,
  ) {}

  async getToken(code: string): Promise<string> {
    const clientId = this.configService.get<string>('DISCORD_CLIENT_ID');
    const clientSecret = this.configService.get<string>(
      'DISCORD_CLIENT_SECRET',
    );
    const redirect_url = this.configService.get<string>('DISCORD_REDIRECT_URL');

    if (!clientId || !clientSecret || !redirect_url)
      throw new InternalServerErrorException();

    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirect_url,
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

  async generateAccessToken(member: Auth): Promise<string> {
    const JWT_SECRET = this.configService.get<string>('JWT_SECRET');

    if (!JWT_SECRET) throw new InternalServerErrorException();

    return this.jwtService.sign(member, {
      secret: JWT_SECRET,
      expiresIn: '15m',
    });
  }

  async generateRefreshToken(userId: string, token: string): Promise<string> {
    const REFRESH_JWT_SECRET =
      this.configService.get<string>('REFRESH_JWT_SECRET');

    if (!REFRESH_JWT_SECRET) throw new InternalServerErrorException();

    const refreshToken = this.jwtService.sign(
      { userId, token },
      {
        secret: REFRESH_JWT_SECRET,
        expiresIn: '30d',
      },
    );

    const hash = await bcrypt.hash(refreshToken, 10);
    const refreshAlreadyExists = await this.storageService.exists(userId);

    if (refreshAlreadyExists) {
      await this.storageService.updateByUserId(userId, refreshToken);
    } else {
      await this.storageService.create({
        userId,
        token,
        refreshToken: hash,
      });
    }

    return refreshToken;
  }

  async verifyRefreshToken(refreshToken: string): Promise<Auth> {
    const REFRESH_JWT_SECRET =
      this.configService.get<string>('REFRESH_JWT_SECRET');

    if (!REFRESH_JWT_SECRET) throw new InternalServerErrorException();

    try {
      const payload = await this.jwtService.verify(refreshToken, {
        secret: REFRESH_JWT_SECRET,
      });

      return {
        userId: payload.userId,
        token: payload.token,
        refreshToken: payload.refreshToken,
      };
    } catch (error) {
      console.error('Error', error);
      throw new UnauthorizedException('Invalid token');
    }
  }

  async rotateToken(payload: Auth, refreshToken: string) {
    const auth = await this.storageService.findByUserId(payload.userId);

    if (!auth) throw new UnauthorizedException('Invalid token');

    const isValid = await bcrypt.compare(refreshToken, auth.refreshToken);

    if (!isValid) throw new UnauthorizedException('Invalid token');

    await this.storageService.deleteByUserId(payload.userId);

    return this.generateRefreshToken(payload.userId, payload.token);
  }
}
