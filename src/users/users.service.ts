import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';

import type { User } from '@opfr/services';

export const UserModelName = 'User';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModelName)
    private readonly userModel: Model<User>,
  ) {}

  findAll() {
    return this.userModel.find().exec();
  }
}
