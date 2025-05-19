import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany, Relation } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { EntityTemplate } from '../../interfaces/EntityTemplate';

@Entity()
export class Store extends EntityTemplate {
  @ApiProperty()
  @Column({ unique: true })
  name!: string;

  @ManyToOne(() => User, (user) => user.stores)
  user!: Relation<User>;

  @OneToMany(() => Transaction, (transaction) => transaction.store)
  transactions!: Relation<Transaction>[];
}
