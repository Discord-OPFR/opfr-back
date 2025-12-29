import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import type { Response } from 'express';
import { AuthGuard } from '../auth/guards/auth.guard';

import { ResponseEntityDto } from './dto/response/response-entity.dto';
import { ResponseEquipmentDTO } from './dto/response/response-equipment.dto';
import { ResponseItemDto } from './dto/response/response-item.dto';
import { UpdateEquipmentDto } from './dto/update/update-equipment.dto';
import { UpdateItemDto } from './dto/update/update-item.dto';
import { EntityService } from './entity.service';

@Controller('entity')
@UseGuards(AuthGuard)
export class EntityController {
  constructor(private readonly entityService: EntityService) {}

  @Get()
  @ApiOkResponse({ type: [ResponseEntityDto]})
  async getAll() {
    return this.entityService.getAllEntity();
  }

  @ApiOkResponse({ type: [ResponseItemDto] })
  @Get('/item')
  async getAllItems() {
    return this.entityService.getAllItems();
  }

  @ApiNotFoundResponse()
  @ApiOkResponse()
  @Put('/item/:id')
  async updateItem(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    if (!(await this.entityService.isItem(id))) throw new NotFoundException();

    console.log('updateItem', id, updateItemDto);
    return this.entityService.updateEntity(id, updateItemDto);
  }

  @ApiOkResponse({ type: [ResponseEquipmentDTO] })
  @Get('/equipment/')
  async getAllEquipments() {
    return this.entityService.getAllEquipments();
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Put('/equipment/:id')
  async updateEquipment(
    @Param('id') id: string,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ) {
    if (!(await this.entityService.isEquipment(id)))
      throw new NotFoundException(`Equipment with id ${id} not found.`);

    return this.entityService.updateEntity(id, updateEquipmentDto);
  }

  @ApiNotFoundResponse()
  @ApiOkResponse({ type: [ResponseItemDto] })
  @Get(':id')
  async getId(@Param('id') id: string, @Res() res: Response) {
    const item = await this.entityService.getItem(id);

    if (!item) {
      res.status(HttpStatus.NOT_FOUND).send();
    }

    res.status(HttpStatus.OK).send(item);
  }
}
