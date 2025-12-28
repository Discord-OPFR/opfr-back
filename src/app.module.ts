import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { connectToServices } from '@opfr/services';

import { AuthModule } from './auth/auth.module';
import { EntityModule } from './entity/entity.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(`${process.env.DB_URI}/${process.env.DB_NAME}`),
    AuthModule,
    EntityModule,
  ],
})
export class AppModule {}

connectToServices(`${process.env.DB_URI}/${process.env.DB_NAME}`);
