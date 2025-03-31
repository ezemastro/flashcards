import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateCardDto } from './create-deck.dto';

export class UpdateCardDto extends PartialType(CreateCardDto) {
  @IsOptional()
  @IsMongoId()
  id_user: string;
  @IsNotEmpty()
  @IsMongoId()
  id_deck: string;
  @IsNotEmpty()
  @IsMongoId()
  id_card: string;
}
