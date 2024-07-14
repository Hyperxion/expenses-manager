import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { EntityTemplate } from '../../interfaces/EntityTemplate';

@Entity()
export class TransactionType extends EntityTemplate {
  @ApiProperty()
  @Column({ unique: true })
  type: string;

  @OneToMany(() => Transaction, (transaction) => transaction.type)
  transactions: Relation<Transaction>[];
}
