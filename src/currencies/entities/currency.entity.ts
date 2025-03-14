import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany, Relation } from 'typeorm';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { EntityTemplate } from '../../interfaces/entityTemplate';

@Entity()
export class Currency extends EntityTemplate {
  @ApiProperty()
  @Column({ unique: true })
  name!: string;

  @ApiProperty()
  @Column({ unique: true })
  abbreviation!: string;

  @OneToMany(() => Transaction, (transaction) => transaction.currency)
  transactions?: Relation<Transaction>[];
}
