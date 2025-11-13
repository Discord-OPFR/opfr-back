import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model, Types } from 'mongoose';

import type { UserInventory } from '@opfr/services';

export const UserInventoryModelName = 'UserInventory';

@Injectable()
export class UsersInventoryService {
  constructor(
    @InjectModel(UserInventoryModelName)
    private readonly userInventoryModel: Model<UserInventory>,
  ) {}

  findByUserId(user: Types.ObjectId) {
    return this.userInventoryModel.findOne({ user }).exec();
  }
}
