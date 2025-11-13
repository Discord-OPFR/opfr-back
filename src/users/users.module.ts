import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { userSchema } from '@opfr/services';

import { UsersController } from './users.controller';
import { UserModelName, UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModelName, schema: userSchema }]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
