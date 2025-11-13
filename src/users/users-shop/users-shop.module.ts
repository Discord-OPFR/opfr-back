import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { userShopSchema } from '@opfr/services';

import { UsersShopModelName, UsersShopService } from './users-shop.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UsersShopModelName, schema: userShopSchema },
    ]),
  ],
  providers: [UsersShopService],
  exports: [UsersShopService],
})
export class UsersShopModule {}
