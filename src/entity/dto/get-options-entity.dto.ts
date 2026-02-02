import { ApiPropertyOptional } from '@nestjs/swagger';
import { ToArray } from '@shared/decorator';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

const ENTITY_SORT = [
  'entityId',
  '-entityId',
  'category',
  '-category',
  'rankId',
  '-rankId',
  'type',
  '-type',
];

type EntitySortType = (typeof ENTITY_SORT)[number];

export class GetOptionsEntityDto {
  @ApiPropertyOptional()
  @IsOptional()
  @ToArray()
  @IsArray()
  @IsEnum(ENTITY_SORT, { each: true })
  sort?: EntitySortType[];

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;
}
