import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model, Types } from 'mongoose';

import type { UserEncyclopedia } from '@opfr/services';

export const UsersEncyclopediaModelName = 'UserEncyclopedia';

@Injectable()
export class UsersEncyclopediaService {
  constructor(
    @InjectModel(UsersEncyclopediaModelName)
    private readonly usersEncyclopediaModel: Model<UserEncyclopedia>,
  ) {}

  findOne(user: Types.ObjectId) {
    return this.usersEncyclopediaModel.findOne({ user });
  }
}
