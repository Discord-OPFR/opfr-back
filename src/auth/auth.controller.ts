import {
  Controller,
  ForbiddenException,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Query,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiOkResponse } from '@nestjs/swagger';
import type { Request, Response } from 'express';

import { DiscordService } from '../discord/discord.service';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { Auth } from './schemas/auth.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly discordService: DiscordService,
    private jwtService: JwtService,
  ) {}

  @Get('me')
  @ApiOkResponse({ type: UserDto })
  async me(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.signedCookies['refresh_token'];

    if (!refreshToken)
      throw new UnauthorizedException('Missing or invalid refresh token');

    try {
      const { token } = await this.authService.verifyRefreshToken(refreshToken);
      const member = await this.discordService.getMemberMe(token);

      res.status(HttpStatus.OK).json({
        userId: member.user.id,
        username: member.user.username,
        avatar: member.user.avatar,
      });
    } catch {
      throw new NotFoundException();
    }
  }

  @Get('login')
  login(@Res() res: Response) {
    const clientId = this.configService.get<string>('DISCORD_CLIENT_ID');
    const redirect_uri = this.configService.get<string>('DISCORD_REDIRECT_URL');

    if (!clientId || !redirect_uri) {
      throw new InternalServerErrorException();
    }

    const discordUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=identify+guilds+guilds.members.read`;

    res.redirect(discordUrl);
  }

  @Get('discord/callback')
  async callback(@Query('code') code: string, @Res() res: Response) {
    const token = await this.authService.getToken(code);
    const member = await this.discordService.getMemberMe(token);

    const admin_role_id = this.configService.get<string>('ADMIN_ROLE_ID');
    const redirectUrl = this.configService.get<string>('APP_REDIRECT_URL');

    if (!admin_role_id || !redirectUrl)
      throw new InternalServerErrorException();

    const hasRoles = member.roles.includes(admin_role_id);

    if (!hasRoles) throw new ForbiddenException();

    const refreshToken = await this.authService.generateRefreshToken(
      member.user.id,
      token,
    );

    const payload: Auth = {
      userId: member.user.id,
      token,
      refreshToken,
    };

    const accessToken = await this.authService.generateAccessToken(payload);

    const NODE_ENV = this.configService.get<string>('NODE_ENV');

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      signed: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      signed: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 1000 * 60 * 15,
    });

    res.status(HttpStatus.OK).redirect(redirectUrl);
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
      path: '/auth/refresh',
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    const accessToken = await this.authService.generateAccessToken(payload);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      signed: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 1000 * 60 * 15,
    });

    res.status(HttpStatus.OK).send();
  }
}
