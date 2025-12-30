import {
  BadGatewayException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { entityService } from '@opfr/services';

import { CreateEquipmentDto } from './dto/create/create-equipment.dto';
import { CreateItemDto } from './dto/create/create-item.dto';
import { UpdateEquipmentDto } from './dto/update/update-equipment.dto';
import { UpdateItemDto } from './dto/update/update-item.dto';

@Injectable()
export class EntityService {
  async getAllEntity() {
    try {
      return entityService.getAll();
    } catch {
      throw new BadGatewayException();
    }
  }

  async getAllItems() {
    const entities = await entityService.getAll();

    return entities.filter(e => entityService.isItem(e));
  }

  async getAllEquipments() {
    const entities = await entityService.getAll();

    return entities.filter(e => entityService.isEquipment(e));
  }

  async getEntity(id: string) {
    try {
      const entity = await entityService.get(id);

      if (!entity) return null;

      return entity;
    } catch {
      return null;
    }
  }

  async getItem(id: string) {
    try {
      const item = await entityService.get(id);

      if (!item || !entityService.isItem(item)) {
        return null;
      }

      return item;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async getEquipment(id: string) {
    try {
      const equipment = await entityService.get(id);

      if (!equipment || !entityService.isEquipment(equipment)) {
        return null;
      }

      return equipment;
    } catch (e) {
      console.error(e);
      return null;
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
    } catch (e) {
      console.error(e);
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
      console.error(e);

      throw new BadGatewayException();
    }
  }
}
