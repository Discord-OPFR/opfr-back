import { BadGatewayException, Injectable } from '@nestjs/common';
import { MongoQueryBuilder } from '@shared/utils/mongoQueryBuilder';

import { userService } from '@opfr/services';

import { FilterUserDto } from './dto/filter-user.dto';
import { GetOptionsUserDto } from './dto/get-user-options.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  async getListUsers(
    filters?: FilterUserDto,
    queryOptions?: GetOptionsUserDto,
  ): Promise<ResponseUserDto[]> {
    const { query, options } = new MongoQueryBuilder()
      .addFilter('discordId', filters?.discordId)
      .addFilter('faction', filters?.faction)
      .addFilter('birthday', filters?.birthday)
      .addFilter('canChangeFaction', filters?.canChangeFaction)
      .addFilter('canChooseFaction', filters?.canChooseFaction)
      .addSorts(queryOptions?.sort)
      .addLimit(queryOptions?.limit)
      .setPage(queryOptions?.page)
      .build();

    try {
      return userService.getMany(query, options);
    } catch {
      throw new BadGatewayException();
    }
  }

  async getUserById(discordId: string): Promise<ResponseUserDto> {
    try {
      return userService.get(discordId);
    } catch {
      throw new BadGatewayException();
    }
  }

  async updateUser(id: string, updates: UpdateUserDto) {
    try {
      return userService.update({ discordId: id }, { $set: updates });
    } catch {
      throw new BadGatewayException();
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      console.log(`Need deleting user ${id}`);
    } catch {
      throw new BadGatewayException();
    }
  }
}
