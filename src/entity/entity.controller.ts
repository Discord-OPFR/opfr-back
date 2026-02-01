import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { DocBadGatewayResponse } from '@shared/decorator';
import { DocNotFoundResponse } from '@shared/decorator';
import { ApiAuth } from '@shared/decorator';

import { CreateEntityDto } from './dto/create/create-entity.dto';
import { FilterEntityDto } from './dto/filter/filter-entity.dto';
import { ResponseEntityDto } from './dto/response/response-entity.dto';
import { UpdateEntityDto } from './dto/update/update-entity.dto';
import { EntityService } from './entity.service';

@Controller('entity')
@ApiAuth()
export class EntityController {
  constructor(private readonly entityService: EntityService) {}

  @Get()
  @ApiOkResponse({ type: [ResponseEntityDto] })
  @DocBadGatewayResponse()
  async getAll(@Query() query: FilterEntityDto) {
    return this.entityService.getAllEntity(query);
  }

  @Get(':entityId')
  @ApiOkResponse({ type: [ResponseEntityDto] })
  @DocNotFoundResponse()
  @DocBadGatewayResponse()
  async getById(@Param('entityId') id: string) {
    return this.entityService.getEntity(id);
  }

  @Put(':entityId')
  @ApiOkResponse({ type: [ResponseEntityDto] })
  @DocBadGatewayResponse()
  async updateEntity(
    @Param('entityId') entityId: string,
    @Body() updateEntityDto: UpdateEntityDto,
  ) {
    return this.entityService.updateEntity(entityId, updateEntityDto);
  }

  @Post()
  @ApiCreatedResponse({ type: [ResponseEntityDto] })
  @DocBadGatewayResponse()
  async createEntity(@Body() createEntityDto: CreateEntityDto) {
    return this.entityService.createEntity(createEntityDto);
  }
}
