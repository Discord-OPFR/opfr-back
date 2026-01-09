import { AuthGuard } from '@auth/guards/auth.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { DocBadGatewayResponse } from '@shared/decorator';
import { DocBadRequestResponse } from '@shared/decorator';
import { DocConflictResponse } from '@shared/decorator';
import { DocNotFoundResponse } from '@shared/decorator';

import { CreateEquipmentDto } from './dto/create/create-equipment.dto';
import { CreateItemDto } from './dto/create/create-item.dto';
import { ResponseEntityDto } from './dto/response/response-entity.dto';
import { ResponseEquipmentDTO } from './dto/response/response-equipment.dto';
import { ResponseItemDto } from './dto/response/response-item.dto';
import { UpdateEquipmentDto } from './dto/update/update-equipment.dto';
import { UpdateItemDto } from './dto/update/update-item.dto';
import { EntityService } from './entity.service';
import { EquipmentNotFoundException } from './errors/EquipmentNotFound';
import { ItemNotFoundException } from './errors/ItemNotFound';

@Controller('entity')
@UseGuards(AuthGuard)
export class EntityController {
  constructor(private readonly entityService: EntityService) {}

  @Post('/item')
  @ApiCreatedResponse({ type: ResponseItemDto })
  @DocBadRequestResponse()
  @DocConflictResponse()
  async createItem(@Body() createItemDto: CreateItemDto) {
    return this.entityService.createEntity(createItemDto);
  }

  @Post('/equipment')
  @ApiCreatedResponse({ type: ResponseEquipmentDTO })
  @DocBadRequestResponse()
  @DocConflictResponse()
  async createEquipment(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.entityService.createEntity(createEquipmentDto);
  }

  @Get()
  @ApiOkResponse({ type: [ResponseEntityDto] })
  @DocBadGatewayResponse()
  async getAll() {
    return this.entityService.getAllEntity();
  }

  @ApiOkResponse({ type: [ResponseItemDto] })
  @Get('/item')
  @DocBadGatewayResponse()
  async getAllItems() {
    return this.entityService.getAllItems();
  }

  @DocNotFoundResponse()
  @ApiOkResponse({ type: ResponseItemDto })
  @DocBadGatewayResponse()
  @Put('/item/:entityId')
  async updateItem(
    @Param('entityId') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    if (!(await this.entityService.isItem(id)))
      throw new ItemNotFoundException(id);

    return this.entityService.updateEntity(id, updateItemDto);
  }

  @DocBadGatewayResponse()
  @ApiOkResponse({ type: [ResponseEquipmentDTO] })
  @Get('/equipment/')
  async getAllEquipments() {
    return this.entityService.getAllEquipments();
  }

  @DocBadGatewayResponse()
  @ApiOkResponse({ type: ResponseEquipmentDTO })
  @DocNotFoundResponse()
  @Put('/equipment/:entityId')
  async updateEquipment(
    @Param('entityId') id: string,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ) {
    if (!(await this.entityService.isEquipment(id)))
      throw new EquipmentNotFoundException(id);

    return this.entityService.updateEntity(id, updateEquipmentDto);
  }

  @DocNotFoundResponse()
  @DocBadGatewayResponse()
  @ApiOkResponse({ type: [ResponseEntityDto] })
  @Get(':entityId')
  async getById(@Param('entityId') id: string) {
    return this.entityService.getEntity(id);
  }

  @DocNotFoundResponse()
  @DocBadGatewayResponse()
  @ApiOkResponse({ type: ResponseItemDto })
  @Get('/item/:entityId')
  async getItemById(@Param('entityId') id: string) {
    return this.entityService.getItem(id);
  }

  @DocNotFoundResponse()
  @DocBadGatewayResponse()
  @ApiOkResponse({ type: ResponseItemDto })
  @Get('/equipment/:entityId')
  async getEquipmentById(@Param('entityId') id: string) {
    return this.entityService.getEquipment(id);
  }
}
