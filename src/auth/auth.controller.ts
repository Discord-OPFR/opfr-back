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
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOkResponse } from '@nestjs/swagger';
import type { Request, Response } from 'express';

import { DiscordService } from '../discord/discord.service';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from './guards/auth.guard';
import { CryptoService } from './storage/crypto.service';
import { StorageService } from './storage/storage.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly discordService: DiscordService,
    private readonly storageService: StorageService,
    private readonly cryptoService: CryptoService,
  ) {}

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: UserDto })
  async me(@Req() req: Request, @Res() res: Response) {
    const authDoc = await this.storageService.findByUserId(req.userId!);

    if (!authDoc) throw new NotFoundException();

    const discordToken = this.cryptoService.decrypt(authDoc.discordToken);
    const member = await this.discordService.getMemberMe(discordToken);

    res.status(HttpStatus.OK).json({
      userId: member.user.id,
      username: member.user.username,
      avatar: member.user.avatar,
    });
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

    const refreshToken = this.authService.generateRefreshToken(member.user.id);
    const accessToken = this.authService.generateAccessToken(member.user.id);

    await this.authService.storeAuth(member.user.id, refreshToken, token);

    const NODE_ENV = this.configService.get<string>('NODE_ENV');

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      signed: true,
      secure: NODE_ENV === 'production',
      sameSite: 'none',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      signed: true,
      secure: NODE_ENV === 'production',
      sameSite: 'none',
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

    const userId = await this.authService.verifyRefreshToken(refreshToken);
    const newRefreshToken = await this.authService.rotateToken(
      userId,
      refreshToken,
    );

    const NODE_ENV = this.configService.get<string>('NODE_ENV');

    res.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
      signed: true,
      secure: NODE_ENV === 'production',
      sameSite: 'none',
      path: '/auth/refresh',
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    const accessToken = this.authService.generateAccessToken(userId);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      signed: true,
      secure: NODE_ENV === 'production',
      sameSite: 'none',
      path: '/',
      maxAge: 1000 * 60 * 15,
    });

    res.status(HttpStatus.OK).send();
  }
}
