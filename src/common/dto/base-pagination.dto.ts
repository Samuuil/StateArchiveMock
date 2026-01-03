import { IsNumber, IsOptional, IsString } from 'class-validator';

export class BasePaginationDto {
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  sortBy?: [string, string][];

  @IsOptional()
  @IsString()
  search?: string;
}
