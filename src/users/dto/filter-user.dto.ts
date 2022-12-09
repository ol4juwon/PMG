import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Column } from 'typeorm';
export class FilterUserDto {
  @Column()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  filter_field: string;

  @Column()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  filter_value: string;

  @Column()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  sort_field: string;

  @Column()
  @IsNotEmpty()
  @IsOptional()
  sort_order_mode: 'ASC' | 'DESC';

  @Column()
  @IsOptional()
  @IsNotEmpty()
  page: number;

  @Column()
  @IsOptional()
  @IsNotEmpty()
  page_size: number;
}
