import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { userEncyclopediaSchema } from '@opfr/services';

import {
  UsersEncyclopediaModelName,
  UsersEncyclopediaService,
} from './users-encyclopedia.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UsersEncyclopediaModelName, schema: userEncyclopediaSchema },
    ]),
  ],
  providers: [UsersEncyclopediaService],
  exports: [UsersEncyclopediaService],
})
export class UsersEncyclopediaModule {}
