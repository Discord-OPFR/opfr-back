import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { EntityController } from './entity.controller';
import { EntityService } from './entity.service';

@Module({
  imports: [AuthModule],
  providers: [EntityService],
  controllers: [EntityController],
})
export class EntityModule {}
