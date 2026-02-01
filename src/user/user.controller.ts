import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';
import { DocBadGatewayResponse, DocNotFoundResponse } from '@shared/decorator';

import { GetUserQueryDto } from './dto/get-user-query.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ type: [ResponseUserDto] })
  @DocBadGatewayResponse()
  async getListUser(
    @Query() query: GetUserQueryDto,
  ): Promise<ResponseUserDto[]> {
    const { sort, limit, page, ...filter } = query;

    return this.userService.getAllUsers(filter, { sort, limit, page });
  }

  @Get(':id')
  @ApiOkResponse({ type: ResponseUserDto })
  @DocBadGatewayResponse()
  async getUser(@Param('id') id: string): Promise<ResponseUserDto> {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: ResponseUserDto })
  @DocBadGatewayResponse()
  async updateUser(
    @Param('id') id: string,
    @Body() updates: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    return this.userService.updateUser(id, updates);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @DocBadGatewayResponse()
  @DocNotFoundResponse()
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
