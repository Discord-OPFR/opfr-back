import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { userQuestSchema } from '@opfr/services';

import { UserQuestModelName, UsersQuestService } from './users-quest.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserQuestModelName, schema: userQuestSchema },
    ]),
  ],
  providers: [UsersQuestService],
  exports: [UsersQuestService],
})
export class UsersQuestModule {}
