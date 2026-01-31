import { PartialType } from '@nestjs/swagger';

import { ResponseUserDto } from './response-user.dto';

export class FilterUserDto extends PartialType(ResponseUserDto) {}
