import { BadGatewayException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APIGuildMember } from 'discord-api-types/v10';

@Injectable()
export class DiscordService {
  constructor(private readonly configService: ConfigService) {}

  async getMemberMe(token: string): Promise<APIGuildMember> {
    const guildId = this.configService.get<string>('MAIN_ACTIVE_GUILD');

    const response = await fetch(
      `https://discord.com/api/v10/users/@me/guilds/${guildId}/member`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw new BadGatewayException({
        message: 'Failed to fetch external resource',
        status: response.status,
        response: result,
      });
    }

    return result;
  }
}
