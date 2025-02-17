import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany, Relation } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { EntityTemplate } from '../../interfaces/entityTemplate';

@Entity()
export class TransactionCategory extends EntityTemplate {
  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ManyToOne(() => User, (user) => user.transactionCategories)
  user: Relation<User>;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions: Relation<Transaction>[];
}
