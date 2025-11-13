import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model, Types } from 'mongoose';

import type { UserCrew } from '@opfr/services';

export const UsersCrewModelName = 'UserCrew';

@Injectable()
export class UsersCrewService {
  constructor(
    @InjectModel(UsersCrewModelName)
    private readonly usersCrewModel: Model<UserCrew>,
  ) {}

  findOne(user: Types.ObjectId) {
    return this.usersCrewModel.findOne({ user });
  }
}
