import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Currency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  abbreviation: string;

  @ManyToOne(() => User, (user) => user.tables)
  user: Relation<User>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
