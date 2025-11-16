import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ProjectionType, RootFilterQuery } from 'mongoose';

import { Auth, AuthDocument } from './schemas/auth.schema';

export const AuthModelName = 'Auth';

@Injectable()
export class StorageService {
  constructor(
    @InjectModel(Auth.name)
    private authModel: Model<Auth>,
  ) {}

  createAuth(auth: Auth) {
    return this.authModel.create(auth);
  }

  async deleteAuthByUserId(userId: string) {
    await this.authModel.deleteOne({ userId: userId });
  }

  async findAuth(
    filter: RootFilterQuery<AuthDocument>,
    projection: ProjectionType<AuthDocument> = {},
  ) {
    return this.authModel.findOne(filter, projection);
  }

  async findAuthByUserId(
    userId: string,
    projection: ProjectionType<AuthDocument> = {},
  ) {
    return this.findAuth({ userId: userId }, projection);
  }
}
