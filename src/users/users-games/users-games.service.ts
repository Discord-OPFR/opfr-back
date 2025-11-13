import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model, Types } from 'mongoose';

import type { UserGames } from '@opfr/services';

export const UsersGamesModuleName = 'UserGames';

@Injectable()
export class UsersGamesService {
  constructor(
    @InjectModel(UsersGamesModuleName)
    private readonly usersGamesModel: Model<UserGames>,
  ) {}

  findOne(user: Types.ObjectId) {
    return this.usersGamesModel.findOne({ user });
  }
}
