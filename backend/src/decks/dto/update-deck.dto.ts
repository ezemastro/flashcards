import { PartialType } from '@nestjs/mapped-types';
import { CreateDeckDto } from './create-deck.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateDeckDto extends PartialType(CreateDeckDto) {
  @IsOptional()
  @IsString()
  id_user: string;
  @IsNotEmpty()
  @IsString()
  id_deck: string;
}

export class DeckIdDto {
  @IsNotEmpty()
  @IsString()
  id_deck: string;
}
