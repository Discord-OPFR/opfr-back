import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';

import { AuthGuard } from '../auth/guards/auth.guard';
import { EntityService } from './entity.service';

@Controller('entity')
@UseGuards(AuthGuard)
export class EntityController {
  constructor(private readonly entityService: EntityService) {}

  @Get(':id')
  async getId(@Param('id') id: string, @Res() res: Response) {
    console.log('yo', id);

    //Get item marche pas là
    const item = await this.entityService.getItem(id);

    console.log(item);

    if (!item) {
      res.status(HttpStatus.NOT_FOUND).send();
    }

    return item;
  }
}
