import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model, Types } from 'mongoose';

import type { UserQuest } from '@opfr/services';

export const UserQuestModelName = 'UserQuest';

@Injectable()
export class UsersQuestService {
  constructor(
    @InjectModel(UserQuestModelName)
    private readonly userQuestService: Model<UserQuest>,
  ) {}

  findOne(user: Types.ObjectId) {
    return this.userQuestService.findOne({ user });
  }
}
