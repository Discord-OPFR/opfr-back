import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model, Types } from 'mongoose';

import type { UserMeta } from '@opfr/services';

export const UserMetaModelName = 'UserMeta';

@Injectable()
export class UsersMetaService {
  constructor(
    @InjectModel(UserMetaModelName)
    private readonly userMetaService: Model<UserMeta>,
  ) {}

  findOne(user: Types.ObjectId) {
    return this.userMetaService.findOne({ user });
  }
}
