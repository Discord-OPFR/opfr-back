import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { userGamesSchema } from '@opfr/services';

import { UsersGamesModuleName, UsersGamesService } from './users-games.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UsersGamesModuleName, schema: userGamesSchema },
    ]),
  ],
  providers: [UsersGamesService],
  exports: [UsersGamesService],
})
export class UsersGamesModule {}
