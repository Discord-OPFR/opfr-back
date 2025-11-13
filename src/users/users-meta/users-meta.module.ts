import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { userMetaSchema } from '@opfr/services';

import { UserMetaModelName, UsersMetaService } from './users-meta.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserMetaModelName, schema: userMetaSchema },
    ]),
  ],
  providers: [UsersMetaService],
  exports: [UsersMetaService],
})
export class UsersMetaModule {}
