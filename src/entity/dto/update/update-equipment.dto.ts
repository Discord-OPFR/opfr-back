import { PartialType } from '@nestjs/swagger';

import { CreateEquipmentDto } from '../create/create-equipment.dto';

export class UpdateEquipmentDto extends PartialType(CreateEquipmentDto) {}
