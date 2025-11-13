import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model, Types } from 'mongoose';

import type { UserDailyReport } from '@opfr/services';

export const UsersDailyReportModelName = 'UserDailyReport';

@Injectable()
export class UsersDailyReportService {
  constructor(
    @InjectModel(UsersDailyReportModelName)
    private readonly usersDailyReportModel: Model<UserDailyReport>,
  ) {}

  findOne(user: Types.ObjectId) {
    return this.usersDailyReportModel.findOne({ user });
  }
}
