import { ApiProperty } from '@nestjs/swagger';
import { Column, ManyToOne, Relation, Entity, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { EntityTemplate } from '../../interfaces/EntityTemplate';

@Entity()
export class Table extends EntityTemplate {
  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.tables)
  user: Relation<User>;

  @OneToMany(() => Transaction, (transaction) => transaction.table)
  transactions: Relation<Transaction>[];
}
