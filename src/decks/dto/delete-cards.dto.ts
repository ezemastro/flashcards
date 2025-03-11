import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class DeleteCardsDto {
  @IsNotEmpty()
  @IsMongoId()
  id_user: string;
  @IsNotEmpty()
  @IsMongoId()
  id_deck: string;
  @IsOptional()
  @IsMongoId({ each: true })
  id_cards: string[];
}
