import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model, Types } from 'mongoose';

import type { UserRaid } from '@opfr/services';

export const UsersRaidModelName = 'UserRaid';

@Injectable()
export class UsersRaidService {
  constructor(
    @InjectModel(UsersRaidModelName)
    private readonly usersRaidModel: Model<UserRaid>,
  ) {}

  findOne(user: Types.ObjectId) {
    return this.usersRaidModel.findOne({ user });
  }
}
