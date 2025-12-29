import { OmitType } from '@nestjs/swagger';
import { IsString } from 'class-validator';



import { type ItemImageId, type ItemType } from '@opfr/definitions';



import { CreateEntityDto } from './create-entity.dto';

export class CreateItemDto extends OmitType(CreateEntityDto, ['type', 'image'] as const) {
  @IsString() //Même histoire de constante etc
  type!: ItemType;

  @IsString() // même histoire
  image!: ItemImageId;
}
