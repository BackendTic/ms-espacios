import { PartialType } from '@nestjs/mapped-types';
import { CreateEspacioDto } from './create-espacio.dto';
import { IsUUID } from 'class-validator';

export class UpdateEspacioDto extends PartialType(CreateEspacioDto) {
  @IsUUID()
  id: string;
}
