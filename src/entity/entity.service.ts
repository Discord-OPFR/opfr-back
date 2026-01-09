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
import { EntityNotFoundException } from './errors/EntityNotFound';
import { EquipmentNotFoundException } from './errors/EquipmentNotFound';
import { ItemNotFoundException } from './errors/ItemNotFound';

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
