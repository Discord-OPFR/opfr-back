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
import { ApiOkResponse } from '@nestjs/swagger';
import { DocNotFoundResponse } from '@shared/decorator';
import { ApiAuth } from '@shared/decorator/auth/auth.decorator';
import type { Request, Response } from 'express';

import { DiscordService } from '../discord/discord.service';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { ERROR_TYPES } from './schemas/auth.schema';
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
  @ApiAuth()
  @DocNotFoundResponse({ description: 'User not found' })
  @ApiOkResponse({ type: UserDto })
  async me(@Req() req: Request, @Res() res: Response) {
    const authDoc = await this.storageService.findByUserId(req.userId);

    if (!authDoc || !req.userId) throw new NotFoundException('User not found');

    const discordToken = this.cryptoService.decrypt(authDoc.discordToken);
    const member = await this.discordService.getMemberMe(discordToken);

    res.status(HttpStatus.OK).json({
      userId: member.user.id,
      username: member.user.username,
      avatar: member.user.avatar,
    });
  }

  @Get('login')
  login(
    @Req() req: Request,
    @Res() res: Response,
    @Query('origin') origin: string,
  ) {
    const clientId = this.configService.get<string>('DISCORD_CLIENT_ID');
    const host = req.get('x-original-host') || req.get('host');
    const protocol = req.get('x-forwarded-proto') || req.protocol;
    const publicUrl = `${protocol}://${host}`;

    if (!clientId || !origin) {
      throw new InternalServerErrorException('origin unspecified');
    }

    const discordUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(`${publicUrl}/api/auth/discord/callback`)}&scope=identify+guilds+guilds.members.read&state=${encodeURIComponent(origin)}`;

    res.redirect(discordUrl);
  }

  @Get('discord/callback')
  async callback(
    @Req() req: Request,
    @Query('code') code: string,
    @Query('state') redirect: string,
    @Res() res: Response,
  ) {
    const host = req.get('x-original-host') || req.get('host');
    const protocol = req.get('x-forwarded-proto') || req.protocol;
    const publicUrl = `${protocol}://${host}`;
    const token = await this.authService.getToken(code, publicUrl);
    const member = await this.discordService.getMemberMe(token);

    const admin_role_id = this.configService.get<string>('ADMIN_ROLE_ID');

    if (!admin_role_id || !redirect) throw new InternalServerErrorException();

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
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      signed: true,
      secure: NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 50,
    });

    res.status(HttpStatus.OK).redirect(redirect);
  }

  @Get('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.signedCookies['refresh_token'];

    if (!refreshToken) throw new UnauthorizedException(ERROR_TYPES.NO_TOKEN);

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
      sameSite: 'lax',
      path: '/auth/refresh',
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    const accessToken = this.authService.generateAccessToken(userId);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      signed: true,
      secure: NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 15,
    });

    res.status(HttpStatus.OK).send();
  }
}
