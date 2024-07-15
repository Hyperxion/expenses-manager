import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, Relation } from 'typeorm';
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
