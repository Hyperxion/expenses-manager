import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  Relation,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { TransactionType } from '../../transaction-types/entities/transaction-type.entity';
import { TransactionCategory } from '../../transaction-categories/entities/transaction-category.entity';
import { Beneficiary } from '../../beneficiaries/entities/beneficiary.entity';
import { Currency } from '../../currencies/entities/currency.entity';
import { Store } from '../../stores/entities/store.entity';
import { Table } from '../../tables/entities/table.entity';
import { EntityTemplate } from '../../interfaces/entityTemplate';
import { Tag } from '../../tags/entities/tag.entity';

@Entity()
export class Transaction extends EntityTemplate {
  @ApiProperty()
  @Column()
  date!: Date;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  amount!: Number;

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable()
  tags!: Relation<Tag[]>;

  @ApiProperty()
  @Column()
  note!: string;

  @ManyToOne(() => User, (user) => user.transactions)
  user!: Relation<User>;

  @ApiProperty()
  @ManyToOne(() => TransactionType, (transactionType) => transactionType.id)
  type!: Relation<TransactionType>;

  @ApiProperty()
  @ManyToOne(() => TransactionCategory, (category) => category.transactions)
  category!: Relation<TransactionCategory>;

  @ApiProperty()
  @ManyToOne(() => Beneficiary, (beneficiary) => beneficiary.transactions)
  beneficiary!: Relation<Beneficiary>;

  @ApiProperty()
  @ManyToOne(() => Currency, (currency) => currency.transactions)
  currency!: Relation<Currency>;

  @ApiProperty()
  @ManyToOne(() => Store, (store) => store.transactions)
  store!: Relation<Store>;

  @ApiProperty()
  @ManyToOne(() => Table, (table) => table.transactions)
  table!: Relation<Table>;
}
