import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { userCooldownSchema } from '@opfr/services';

import {
  UsersCooldownModelName,
  UsersCooldownService,
} from './users-cooldown.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UsersCooldownModelName, schema: userCooldownSchema },
    ]),
  ],
  providers: [UsersCooldownService],
  exports: [UsersCooldownService],
})
export class UsersCooldownModule {}
