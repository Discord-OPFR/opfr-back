import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { authSchema } from './definition/schema';
import { AuthModelName, StorageService } from './storage.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AuthModelName, schema: authSchema }]),
  ],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
