import { IsISO8601, IsNotEmpty, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CreateUserDto {
  @Column()
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  gender: string;

  @Column()
  @IsISO8601()
  @IsNotEmpty()
  date_of_birth: string;
}
