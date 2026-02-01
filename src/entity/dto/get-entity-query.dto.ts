import { IntersectionType } from '@nestjs/swagger';

import { FilterEntityDto } from './filter/filter-entity.dto';
import { GetOptionsEntityDto } from './get-options-entity.dto';

export class GetEntityQueryDto extends IntersectionType(
  FilterEntityDto,
  GetOptionsEntityDto,
) {}
