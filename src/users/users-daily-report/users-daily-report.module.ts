import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { userDailyReportSchema } from '@opfr/services';

import {
  UsersDailyReportModelName,
  UsersDailyReportService,
} from './users-daily-report.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UsersDailyReportModelName, schema: userDailyReportSchema },
    ]),
  ],
  providers: [UsersDailyReportService],
  exports: [UsersDailyReportService],
})
export class UsersDailyReportModule {}
