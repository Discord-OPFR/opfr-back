import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { DiscordService } from '../discord/discord.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [JwtModule.register({}), StorageModule],
  providers: [AuthService, DiscordService],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
