import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsString()
  answer: string;

  @IsOptional()
  @IsString()
  category: string;
}

export class CreateDeckDto {
  @IsNotEmpty()
  @IsMongoId()
  id_user: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  public: boolean;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateCardDto)
  cards: CreateCardDto[];

  @IsOptional()
  @IsString({ each: true })
  categories: string[];
}
