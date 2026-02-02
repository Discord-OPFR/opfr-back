import {
  BadGatewayException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { MongoQueryBuilder } from '@shared/utils/mongoQueryBuilder';

import { entityService } from '@opfr/services';

import { CreateEntityDto } from './dto/create/create-entity.dto';
import { FilterEntityDto } from './dto/filter/filter-entity.dto';
import { GetOptionsEntityDto } from './dto/get-options-entity.dto';
import { UpdateEntityDto } from './dto/update/update-entity.dto';
import { EntityNotFoundException } from './errors/EntityNotFound';

@Injectable()
export class EntityService {
  async getAllEntity(
    filters?: FilterEntityDto,
    queryOptions?: GetOptionsEntityDto,
  ) {
    const { query, options } = new MongoQueryBuilder()
      .addSearch('entityId', filters?.entityId)
      .addFilter('category', filters?.category)
      .addFilter('rankId', filters?.rankId)
      .addFilter('type', filters?.type)
      .addSorts(queryOptions?.sort)
      .addLimit(queryOptions?.limit)
      .setPage(queryOptions?.page)
      .build();

    try {
      return entityService.getMany(query, options);
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

  async updateEntity(id: string, updateEntityDto: UpdateEntityDto) {
    try {
      return entityService.update(
        { entityId: id },
        {
          $set: updateEntityDto,
        },
      );
    } catch {
      throw new BadGatewayException();
    }
  }

  async createEntity(createEntityDto: CreateEntityDto) {
    try {
      return entityService.createInDb(createEntityDto);
    } catch (e) {
      if (e && typeof e === 'object' && 'code' in e && e.code === 11000) {
        throw new ConflictException();
      }
      throw new BadGatewayException();
    }
  }
}
