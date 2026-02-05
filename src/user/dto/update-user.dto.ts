import { OmitType, PartialType } from '@nestjs/swagger';

import { ResponseUserDto } from './response-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(ResponseUserDto, ['discordId']),
) {}
