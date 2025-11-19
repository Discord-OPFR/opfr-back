import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Auth, AuthSchema } from '../schemas/auth.schema';
import { CryptoService } from './crypto.service';
import { StorageService } from './storage.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
  ],
  providers: [StorageService, CryptoService],
  exports: [StorageService, CryptoService],
})
export class StorageModule {}
