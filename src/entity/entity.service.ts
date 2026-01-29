import {
  BadGatewayException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { MongoQueryBuilder } from '@shared/types/mongoQueryBuilder';

import { EQUIPMENT_CATEGORY, ITEM_CATEGORY } from '@opfr/definitions';
import { entityService } from '@opfr/services';

import { CreateEquipmentDto } from './dto/create/create-equipment.dto';
import { CreateItemDto } from './dto/create/create-item.dto';
import { FilterEntityDto } from './dto/filter/filter-entity.dto';
import { FilterEquipmentDto } from './dto/filter/filter-equipment.dto';
import { FilterItemDto } from './dto/filter/filter-item.dto';
import { UpdateEquipmentDto } from './dto/update/update-equipment.dto';
import { UpdateItemDto } from './dto/update/update-item.dto';
import { EntityNotFoundException } from './errors/EntityNotFound';
import { EquipmentNotFoundException } from './errors/EquipmentNotFound';
import { ItemNotFoundException } from './errors/ItemNotFound';

@Injectable()
export class EntityService {
  async getAllEntity(filters?: FilterEntityDto) {
    const mongoQuery = new MongoQueryBuilder()
      .addSearch('entityId', filters?.entityId)
      .addFilter('category', filters?.category)
      .addFilter('rankId', filters?.rankId)
      .addFilter('type', filters?.type)
      .build();

    try {
      return entityService.getMany(mongoQuery);
    } catch {
      throw new BadGatewayException();
    }
  }

  async getAllItems(filters?: FilterItemDto) {
    const mongoQuery = new MongoQueryBuilder()
      .addSearch('entityId', filters?.entityId)
      .addFilter('category', filters?.category || ITEM_CATEGORY)
      .addFilter('rankId', filters?.rankId)
      .addFilter('type', filters?.type)
      .build();

    try {
      return entityService.getMany(mongoQuery);
    } catch {
      throw new BadGatewayException();
    }
  }

  async getAllEquipments(filters?: FilterEquipmentDto) {
    const mongoQuery = new MongoQueryBuilder()
      .addSearch('entityId', filters?.entityId)
      .addFilter('category', filters?.category || EQUIPMENT_CATEGORY)
      .addFilter('rankId', filters?.rankId)
      .addFilter('type', filters?.type)
      .build();

    try {
      return entityService.getMany(mongoQuery);
    } catch {
      throw new BadGatewayException();
    }
  }

  async getEntity(id: string) {
    try {
      const entity = await entityService.get(id);

      if (!entity) throw new EntityNotFoundException(id);

      return entity;
    } catch (err) {
      if (err instanceof EntityNotFoundException) {
        throw err;
      }

      throw new BadGatewayException();
    }
  }

  async getItem(id: string) {
    try {
      const item = await entityService.get(id);

      if (!item || !entityService.isItem(item)) {
        throw new ItemNotFoundException(id);
      }

      return item;
    } catch (err) {
      if (err instanceof ItemNotFoundException) {
        throw err;
      }

      throw new BadGatewayException();
    }
  }

  async getEquipment(id: string) {
    try {
      const equipment = await entityService.get(id);

      if (!equipment || !entityService.isEquipment(equipment)) {
        throw new EquipmentNotFoundException(id);
      }

      return equipment;
    } catch (err) {
      if (err instanceof EquipmentNotFoundException) {
        throw err;
      }

      throw new BadGatewayException();
    }
  }

  async isItem(id: string) {
    const item = await this.getItem(id);

    return item !== null;
  }

  async isEquipment(id: string) {
    const equipment = await this.getEquipment(id);

    return equipment !== null;
  }

  async updateEntity(
    id: string,
    updateItemDto: UpdateItemDto | UpdateEquipmentDto,
  ) {
    try {
      return entityService.update(
        { entityId: id },
        {
          $set: updateItemDto,
        },
      );
    } catch {
      throw new BadGatewayException();
    }
  }

  async createEntity(createItemDto: CreateItemDto | CreateEquipmentDto) {
    try {
      return entityService.createInDb(createItemDto);
    } catch (e) {
      if (e && typeof e === 'object' && 'code' in e && e.code === 11000) {
        throw new ConflictException();
      }
      throw new BadGatewayException();
    }
  }
}
