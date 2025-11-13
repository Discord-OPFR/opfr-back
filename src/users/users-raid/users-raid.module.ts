import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { userRaidSchema } from '@opfr/services';

import { UsersRaidModelName, UsersRaidService } from './users-raid.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UsersRaidModelName, schema: userRaidSchema },
    ]),
  ],
  providers: [UsersRaidService],
  exports: [UsersRaidService],
})
export class UsersRaidModule {}
