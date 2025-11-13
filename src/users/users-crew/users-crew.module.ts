import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { userCrewSchema } from '@opfr/services';

import { UsersCrewModelName, UsersCrewService } from './users-crew.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UsersCrewModelName, schema: userCrewSchema },
    ]),
  ],
  providers: [UsersCrewService],
  exports: [UsersCrewService],
})
export class UsersCrewModule {}
