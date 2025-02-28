import { Beneficiary } from '../../beneficiaries/entities/beneficiary.entity';
import { Store } from '../../stores/entities/store.entity';
import { Table } from '../../tables/entities/table.entity';
import { Tag } from '../../tags/entities/tag.entity';
import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { TransactionCategory } from '../../transaction-categories/entities/transaction-category.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { EntityTemplate } from '../../interfaces/entityTemplate';

@Entity()
export class User extends EntityTemplate {
  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  email!: string;

  @OneToMany(() => Table, (table) => table.user)
  tables!: Relation<Table>[];

  @OneToMany(() => Tag, (tag) => tag.user)
  tags!: Relation<Tag>[];

  @OneToMany(() => Store, (store) => store.user)
  stores!: Relation<Store>[];

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions!: Relation<Transaction>[];

  @OneToMany(() => TransactionCategory, (category) => category.user)
  transactionCategories!: Relation<TransactionCategory>[];

  @OneToMany(() => Beneficiary, (beneficiary) => beneficiary.user)
  beneficiaries!: Relation<Beneficiary>[];
}
