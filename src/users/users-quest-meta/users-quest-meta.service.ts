import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model, Types } from 'mongoose';

import type { UserQuestMeta } from '@opfr/services';

export const UserQuestMetaModelName = 'UserQuestMeta';

@Injectable()
export class UserQuestMetaService {
  constructor(
    @InjectModel(UserQuestMetaModelName)
    private readonly userQuestModel: Model<UserQuestMeta>,
  ) {}

  findOne(user: Types.ObjectId) {
    return this.userQuestModel.findOne({ user });
  }
}
