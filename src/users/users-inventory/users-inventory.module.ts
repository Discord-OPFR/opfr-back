import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { userInventorySchema } from '@opfr/services';

import {
  UserInventoryModelName,
  UsersInventoryService,
} from './users-inventory.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserInventoryModelName, schema: userInventorySchema },
    ]),
  ],
  providers: [UsersInventoryService],
  exports: [UsersInventoryService],
})
export class UsersInventoryModule {}
