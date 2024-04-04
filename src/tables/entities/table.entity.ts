import { ApiProperty } from '@nestjs/swagger';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  Relation,
  Entity,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Table {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  description: string;

  //   @ManyToOne(() => User, (user) => user.tables)
  //   user: Relation<User>;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
