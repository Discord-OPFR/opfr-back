import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { userOrnamentsSchema } from '@opfr/services';

import {
  UsersOrnamentsModelName,
  UsersOrnamentsService,
} from './users-ornaments.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UsersOrnamentsModelName, schema: userOrnamentsSchema },
    ]),
  ],
  providers: [UsersOrnamentsService],
  exports: [UsersOrnamentsService],
})
export class UsersOrnamentsModule {}
