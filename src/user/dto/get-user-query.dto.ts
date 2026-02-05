import { IntersectionType } from '@nestjs/swagger';

import { FilterUserDto } from './filter-user.dto';
import { GetOptionsUserDto } from './get-user-options.dto';

export class GetUserQueryDto extends IntersectionType(
  FilterUserDto,
  GetOptionsUserDto,
) {}
