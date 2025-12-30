import { OPFRBadGatewayResponse } from '@common/decorator/swagger/bad-gateway.decorator';
import { OPFRBadRequestResponse } from '@common/decorator/swagger/bad-request.decorator';
import { OPFRConflictResponse } from '@common/decorator/swagger/conflict.decorator';
import { OPFRNotFoundResponse } from '@common/decorator/swagger/not-found.decorator';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import type { Response } from 'express';

import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateEquipmentDto } from './dto/create/create-equipment.dto';
import { CreateItemDto } from './dto/create/create-item.dto';
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

  @Post('/item')
  @ApiCreatedResponse({ type: ResponseItemDto })
  @OPFRBadRequestResponse()
  @OPFRConflictResponse()
  async createItem(@Body() createItemDto: CreateItemDto) {
    return this.entityService.createEntity(createItemDto);
  }

  @Post('/equipment')
  @ApiCreatedResponse({ type: ResponseEquipmentDTO })
  @OPFRBadRequestResponse()
  @OPFRConflictResponse()
  async createEquipment(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.entityService.createEntity(createEquipmentDto);
  }

  @Get()
  @ApiOkResponse({ type: [ResponseEntityDto] })
  @OPFRBadGatewayResponse()
  async getAll() {
    return this.entityService.getAllEntity();
  }

  @ApiOkResponse({ type: [ResponseItemDto] })
  @Get('/item')
  @OPFRBadGatewayResponse()
  async getAllItems() {
    return this.entityService.getAllItems();
  }

  @OPFRNotFoundResponse()
  @ApiOkResponse({ type: ResponseItemDto })
  @OPFRBadGatewayResponse()
  @Put('/item/:id')
  async updateItem(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    if (!(await this.entityService.isItem(id))) throw new NotFoundException();

    console.log('updateItem', id, updateItemDto);
    return this.entityService.updateEntity(id, updateItemDto);
  }

  @OPFRBadGatewayResponse()
  @ApiOkResponse({ type: [ResponseEquipmentDTO] })
  @Get('/equipment/')
  async getAllEquipments() {
    return this.entityService.getAllEquipments();
  }

  @OPFRBadGatewayResponse()
  @ApiOkResponse({ type: ResponseItemDto })
  @OPFRNotFoundResponse()
  @Put('/equipment/:id')
  async updateEquipment(
    @Param('id') id: string,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ) {
    if (!(await this.entityService.isEquipment(id)))
      throw new NotFoundException(`Equipment with id ${id} not found.`);

    return this.entityService.updateEntity(id, updateEquipmentDto);
  }

  @OPFRNotFoundResponse()
  @ApiOkResponse({ type: [ResponseItemDto] })
  @Get(':id')
  async getById(@Param('id') id: string, @Res() res: Response) {
    const entity = await this.entityService.getEntity(id);

    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }

    res.status(HttpStatus.OK).send(entity);
  }
}
