import { IsISO8601, IsNotEmpty, IsString } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

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
  @IsString()
  @IsISO8601()
  @IsNotEmpty()
  date_of_birth: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  date_created: Date;

  @Column()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public date_updated: Date;
}
