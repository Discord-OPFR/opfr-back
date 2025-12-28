import { Module } from '@nestjs/common';

// import { MongooseModule } from '@nestjs/mongoose';
// import { entitySchema } from '@opfr/services';
import { AuthModule } from '../auth/auth.module';
// import { AuthGuard } from '../auth/guards/auth.guard';
import { EntityController } from './entity.controller';
import { EntityService } from './entity.service';

@Module({
  imports: [
    AuthModule,
    // MongooseModule.forFeature([
    //   { name: , schema: entitySchema }
    // ])
  ],
  providers: [EntityService],
  controllers: [EntityController],
})
export class EntityModule {}
