import { BadGatewayException, Injectable } from '@nestjs/common';
import { MongoQueryBuilder } from '@shared/types/mongoQueryBuilder';

import { userService } from '@opfr/services';

import { FilterUserDto } from './dto/filter-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  async getAllUsers(filters?: FilterUserDto): Promise<ResponseUserDto[]> {
    const mongodbQuery = new MongoQueryBuilder()
      .addFilter('discordId', filters?.discordId)
      .addFilter('faction', filters?.faction)
      .addFilter('birthday', filters?.birthday)
      .addFilter('canChangeFaction', filters?.canChangeFaction)
      .addFilter('canChooseFaction', filters?.canChooseFaction)
      .build();

    console.log(mongodbQuery);

    try {
      return userService.getMany(mongodbQuery);
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
