import {
  BadRequestException,
  Controller,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  Query,
  Redirect,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';

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
  async callback(@Query('code') code: string) {
    if (!code) throw new BadRequestException('Code missing');

    const token = await this.authService.getToken(code);

    const member = await this.authService.getDiscordUserInfo(token);

    const admin_role_id = this.configService.get<string>('ADMIN_ROLE_ID');

    if (!admin_role_id) throw new InternalServerErrorException();

    const hasRoles = member.roles.includes(admin_role_id);

    if (!hasRoles) throw new ForbiddenException();

    const payload = {
      id: member.user.id as string,
      name: member.user.username as string,
      token,
    };

    const jwtToken = await this.authService.generateAccessToken(payload);

    return { token: jwtToken };
  }
}
