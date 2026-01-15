import { ERROR_TYPES } from '@auth/schemas/auth.schema';
import {
  CanActivate,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.signedCookies['access_token'];

    if (!accessToken) {
      throw new UnauthorizedException(ERROR_TYPES.NO_TOKEN);
    }

    const JWT_SECRET = this.configService.get<string>('JWT_SECRET');

    if (!JWT_SECRET) throw new InternalServerErrorException();

    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: JWT_SECRET,
      });

      if (!payload.userId) return false;

      request.userId = payload.userId;

      return true;
    } catch {
      throw new UnauthorizedException(ERROR_TYPES.TOKEN_EXPIRED);
    }
  }
}
