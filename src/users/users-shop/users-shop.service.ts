import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model, Types } from 'mongoose';

import type { UserShop } from '@opfr/services';

export const UsersShopModelName = 'UserShop';

@Injectable()
export class UsersShopService {
  constructor(
    @InjectModel(UsersShopModelName)
    private readonly usersShopModel: Model<UserShop>,
  ) {}

  findOne(user: Types.ObjectId) {
    return this.usersShopModel.findOne({ user });
  }
}
