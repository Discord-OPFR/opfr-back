import {
  Controller,
  ForbiddenException,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Query,
  Redirect,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';

import { AuthService, TokenPayload } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('login')
  @Redirect()
  login() {
    const clientId = this.configService.get<string>('DISCORD_CLIENT_ID');
    const redirect_uri = this.configService.get<string>('DISCORD_REDIRECT_URL');

    if (!clientId || !redirect_uri) {
      throw new InternalServerErrorException();
    }

    const discordUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=identify+guilds+guilds.members.read`;

    return { url: discordUrl };
  }

  @Get('discord/callback')
  async callback(@Query('code') code: string, @Res() res: Response) {
    const token = await this.authService.getToken(code);

    const member = await this.authService.getDiscordUserInfo(token);

    const admin_role_id = this.configService.get<string>('ADMIN_ROLE_ID');

    if (!admin_role_id) throw new InternalServerErrorException();

    const hasRoles = member.roles.includes(admin_role_id);

    if (!hasRoles) throw new ForbiddenException();

    const payload: TokenPayload = {
      userId: member.user.id,
      username: member.user.username,
      discordToken: token,
    };

    const accessToken = await this.authService.generateAccessToken(payload);
    const refreshToken = await this.authService.generateRefreshToken(payload);

    const NODE_ENV = this.configService.get<string>('NODE_ENV');

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      signed: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    res.status(HttpStatus.CREATED).json({ accessToken });
  }

  @Get('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.signedCookies['refresh_token'];

    if (!refreshToken)
      throw new UnauthorizedException('Missing or invalid refresh token');

    const payload = await this.authService.verifyRefreshToken(refreshToken);
    const newToken = await this.authService.rotateToken(payload, refreshToken);

    const NODE_ENV = this.configService.get<string>('NODE_ENV');

    res.cookie('refresh_token', newToken, {
      httpOnly: true,
      signed: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    res.status(HttpStatus.CREATED).send();
  }
}
