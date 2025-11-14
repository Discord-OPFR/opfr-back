import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { userSchema } from '@opfr/services';

import { AuthModule } from '../auth/auth.module';
import { UsersCooldownModule } from './users-cooldown/users-cooldown.module';
import { UsersCrewModule } from './users-crew/users-crew.module';
import { UsersDailyReportModule } from './users-daily-report/users-daily-report.module';
import { UsersEncyclopediaModule } from './users-encyclopedia/users-encyclopedia.module';
import { UsersGamesModule } from './users-games/users-games.module';
import { UsersInventoryModule } from './users-inventory/users-inventory.module';
import { UsersMetaModule } from './users-meta/users-meta.module';
import { UsersOrnamentsModule } from './users-ornaments/users-ornaments.module';
import { UsersQuestMetaModule } from './users-quest-meta/users-quest-meta.module';
import { UsersQuestModule } from './users-quest/users-quest.module';
import { UsersRaidModule } from './users-raid/users-raid.module';
import { UsersShopModule } from './users-shop/users-shop.module';
import { UsersController } from './users.controller';
import { UserModelName, UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModelName, schema: userSchema }]),
    UsersInventoryModule,
    UsersMetaModule,
    UsersQuestModule,
    UsersQuestMetaModule,
    UsersCrewModule,
    UsersEncyclopediaModule,
    UsersOrnamentsModule,
    UsersCooldownModule,
    UsersDailyReportModule,
    UsersGamesModule,
    UsersRaidModule,
    UsersShopModule,
    AuthModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
