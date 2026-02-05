import { ApiPropertyOptional } from '@nestjs/swagger';
import { ToArray } from '@shared/decorator';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional } from 'class-validator';

const USER_SORT = [
  'discordId',
  '-discordId',
  'birthday',
  '-birthday',
  'faction',
  '-faction',
  'canChangeFaction',
  '-canChangeFaction',
  'canChooseFaction',
  '-canChooseFaction',
];

type UserSort = (typeof USER_SORT)[number];

export class GetOptionsUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @ToArray()
  @IsArray()
  @IsEnum(USER_SORT, { each: true })
  sort?: UserSort[];

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}
