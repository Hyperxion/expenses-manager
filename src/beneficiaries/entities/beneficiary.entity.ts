import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany, Relation } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { EntityTemplate } from '../../interfaces/entityTemplate';

@Entity()
export class Beneficiary extends EntityTemplate {
  @ApiProperty()
  @Column({ unique: true })
  name!: string;

  @ApiProperty({ required: false })
  @Column({ unique: true, nullable: true })
  accountNumber?: string;

  @ManyToOne(() => User, (user) => user.beneficiaries)
  user!: Relation<User>;

  @OneToMany(() => Transaction, (transaction) => transaction.beneficiary)
  transactions!: Relation<Beneficiary>[];
}
