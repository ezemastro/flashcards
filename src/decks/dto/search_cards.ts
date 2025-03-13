import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class PaguinationDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  page: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  limit: number;
}

export class SearchCardsDto extends PaguinationDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsString()
  category: string;
}
