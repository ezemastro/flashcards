import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { CreateCardDto } from './create-deck.dto';
import { Type } from 'class-transformer';

export class AddCartsDto {
  @IsNotEmpty()
  @IsMongoId()
  id_user: string;
  @IsNotEmpty()
  @IsMongoId()
  id_deck: string;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateCardDto)
  cards: CreateCardDto[];
}
