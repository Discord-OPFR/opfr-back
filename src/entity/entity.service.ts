import { Injectable } from '@nestjs/common';

import { entityService } from '@opfr/services';

@Injectable()
export class EntityService {
  getAllEntity() {
    return entityService.getAll();
  }

  async getAllItems() {
    const entities = await entityService.getAll();

    return entities.filter(e => entityService.isItem(e));
  }

  async getItem(id: string) {
    console.log(id);
    try {
      const item = await entityService.get(id);

      if (!item || !entityService.isItem(item)) {
        return null; //throw Error Custom Item Not Found
      }

      return item;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
