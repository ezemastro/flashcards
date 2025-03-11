import { PartialType } from '@nestjs/mapped-types';
import { CreateDeckDto } from './create-deck.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDeckDto extends PartialType(CreateDeckDto) {
  @IsNotEmpty()
  @IsString()
  id_user: string;
  @IsNotEmpty()
  @IsString()
  id_deck: string;
}
