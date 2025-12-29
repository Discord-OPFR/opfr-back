import { Injectable } from '@nestjs/common';

import { entityService } from '@opfr/services';
import { UpdateEquipmentDto } from './dto/update/update-equipment.dto';
import { UpdateItemDto } from './dto/update/update-item.dto';

@Injectable()
export class EntityService {
  getAllEntity() {
    return entityService.getAll();
  }

  async getAllItems() {
    const entities = await entityService.getAll();

    return entities.filter(e => entityService.isItem(e));
  }

  async getAllEquipments() {
    const entities = await entityService.getAll();

    return entities.filter(e => entityService.isEquipment(e));
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

  async updateEntity(id: string, updateItemDto: UpdateItemDto | UpdateEquipmentDto) {
    try {
      const flattenObject = (
        obj: Record<string, any>,
        parentKey = '',
        result: Record<string, any> = {}
      )=> {
        for (const [key, value] of Object.entries(obj)) {
          if (!value) continue;

          const newKey = parentKey ? `${parentKey}.${key}` : key;

          if (typeof value === 'object' && !Array.isArray(value)) {
            flattenObject(value, newKey, result);
          } else {
            result[newKey] = value;
          }
        }

        return result;
      };

      const updates = flattenObject(updateItemDto);

      await entityService.update({ entityId: id}, {
        $set: updates
      });
    } catch (e) {
      console.error(e);
    }
  }
}
