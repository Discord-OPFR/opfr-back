import { PartialType } from '@nestjs/swagger';

import { CreateEntityDto } from '../create/create-entity.dto';

export class UpdateEntityDto extends PartialType(CreateEntityDto) {}
