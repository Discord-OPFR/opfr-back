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
import { OPFRBadGatewayResponse } from '@shared/decorator';
import { OPFRBadRequestResponse } from '@shared/decorator';
import { OPFRConflictResponse } from '@shared/decorator';
import { OPFRNotFoundResponse } from '@shared/decorator';

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
  @Put('/item/:entityId')
  async updateItem(
    @Param('entityId') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    if (!(await this.entityService.isItem(id)))
      throw new ItemNotFoundException(id);

    return this.entityService.updateEntity(id, updateItemDto);
  }

  @OPFRBadGatewayResponse()
  @ApiOkResponse({ type: [ResponseEquipmentDTO] })
  @Get('/equipment/')
  async getAllEquipments() {
    return this.entityService.getAllEquipments();
  }

  @OPFRBadGatewayResponse()
  @ApiOkResponse({ type: ResponseEquipmentDTO })
  @OPFRNotFoundResponse()
  @Put('/equipment/:entityId')
  async updateEquipment(
    @Param('entityId') id: string,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ) {
    if (!(await this.entityService.isEquipment(id)))
      throw new EquipmentNotFoundException(id);

    return this.entityService.updateEntity(id, updateEquipmentDto);
  }

  @OPFRNotFoundResponse()
  @OPFRBadGatewayResponse()
  @ApiOkResponse({ type: [ResponseEntityDto] })
  @Get(':entityId')
  async getById(@Param('entityId') id: string) {
    return this.entityService.getEntity(id);
  }

  @OPFRNotFoundResponse()
  @OPFRBadGatewayResponse()
  @ApiOkResponse({ type: ResponseItemDto })
  @Get('/item/:entityId')
  async getItemById(@Param('entityId') id: string) {
    return this.entityService.getItem(id);
  }

  @OPFRNotFoundResponse()
  @OPFRBadGatewayResponse()
  @ApiOkResponse({ type: ResponseItemDto })
  @Get('/equipment/:entityId')
  async getEquipmentById(@Param('entityId') id: string) {
    return this.entityService.getEquipment(id);
  }
}
