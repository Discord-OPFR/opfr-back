import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { userQuestMetaSchema } from '@opfr/services';

import {
  UserQuestMetaModelName,
  UserQuestMetaService,
} from './users-quest-meta.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserQuestMetaModelName, schema: userQuestMetaSchema },
    ]),
  ],
  providers: [UserQuestMetaService],
  exports: [UserQuestMetaService],
})
export class UsersQuestMetaModule {}
