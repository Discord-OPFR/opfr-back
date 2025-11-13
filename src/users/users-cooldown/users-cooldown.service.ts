import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model, Types } from 'mongoose';

import type { UserCooldown } from '@opfr/services';

export const UsersCooldownModelName = 'UserCooldown';

@Injectable()
export class UsersCooldownService {
  constructor(
    @InjectModel(UsersCooldownModelName)
    private readonly usersCooldownModel: Model<UserCooldown>,
  ) {}

  findOne(user: Types.ObjectId) {
    return this.usersCooldownModel.findOne({ user });
  }
}
