import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { EntityTemplate } from '../../interfaces/EntityTemplate';

@Entity()
export class Beneficiary extends EntityTemplate {
  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ManyToOne(() => User, (user) => user.beneficiaries)
  user: Relation<User>;

  @OneToMany(() => Transaction, (transaction) => transaction.beneficiary)
  transactions: Relation<Beneficiary>[];
}
