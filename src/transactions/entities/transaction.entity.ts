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
import { TransactionType } from '../../transaction-types/entities/transaction-type.entity';
import { TransactionCategory } from '../../transaction-categories/entities/transaction-category.entity';
import { Beneficiary } from '../../beneficiaries/entities/beneficiary.entity';
import { Currency } from '../../currencies/entities/currency.entity';
import { Store } from '../../stores/entities/store.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  date: Date;

  @ApiProperty()
  @Column()
  amount: Number;

  @ApiProperty()
  @Column()
  note: string;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.transactions)
  user: Relation<User>;

  @ApiProperty()
  @ManyToOne(() => TransactionType, (transactionType) => transactionType.id)
  type: Relation<TransactionType>;

  @ApiProperty()
  @ManyToOne(() => TransactionCategory, (category) => category.transactions)
  category: Relation<TransactionCategory>;

  @ApiProperty()
  @ManyToOne(() => Beneficiary, (beneficiary) => beneficiary.transactions)
  beneficiary: Relation<Beneficiary>;

  @ApiProperty()
  @ManyToOne(() => Currency, (currency) => currency.transactions)
  currency: Relation<Currency>;

  @ApiProperty()
  @ManyToOne(() => Store, (store) => store.transactions)
  store: Relation<Store>;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.transactions)
  table: Relation<User>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
