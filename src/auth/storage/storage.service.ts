import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Model,
  ProjectionType,
  RootFilterQuery,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';

import { Auth, AuthDocument, CachedMember } from '../schemas/auth.schema';

@Injectable()
export class StorageService {
  constructor(
    @InjectModel(Auth.name)
    private authModel: Model<Auth>,
  ) {}

  create(auth: Auth) {
    return this.authModel.create(auth);
  }

  async deleteByUserId(userId: string) {
    await this.authModel.deleteOne({ userId: userId });
  }

  async exists(userId: string) {
    return this.authModel.exists({ userId });
  }

  async find(
    filter: RootFilterQuery<AuthDocument>,
    projection: ProjectionType<AuthDocument> = {},
  ) {
    return this.authModel.findOne(filter, projection);
  }

  async findByUserId(
    userId?: string,
    projection: ProjectionType<AuthDocument> = {},
  ) {
    return this.find({ userId }, projection);
  }

  async updateByUserId(userId: string, token: string) {
    return this.authModel.updateOne({ userId }, { refreshToken: token });
  }

  async updateAuth(
    userId: string,
    update: UpdateQuery<AuthDocument> | UpdateWithAggregationPipeline,
  ) {
    await this.authModel.updateOne({ userId }, update);
  }

  async updateCachedMember(userId: string, cachedMember: CachedMember) {
    await this.authModel.updateOne({ userId }, { cachedMember });
  }
}
