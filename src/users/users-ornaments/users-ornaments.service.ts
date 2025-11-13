import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model, Types } from 'mongoose';

import type { UserOrnaments } from '@opfr/services';

export const UsersOrnamentsModelName = 'UserOrnaments';

@Injectable()
export class UsersOrnamentsService {
  constructor(
    @InjectModel(UsersOrnamentsModelName)
    private readonly usersOrnamentsModel: Model<UserOrnaments>,
  ) {}

  findOne(user: Types.ObjectId) {
    return this.usersOrnamentsModel.findOne({ user });
  }
}
