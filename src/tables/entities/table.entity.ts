import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  ManyToOne,
  Relation,
  Entity,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { EntityTemplate } from '../../interfaces/entityTemplate';
import { UserRoleTable } from '../../user-role-table/entities/userRoleTable.entity';

@Entity()
export class Table extends EntityTemplate {
  @ApiProperty()
  @Column({ unique: true })
  name!: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  description!: string;

  @ManyToOne(() => User, (user) => user.tables)
  user!: Relation<User>;

  @OneToMany(() => Transaction, (transaction) => transaction.table)
  transactions!: Relation<Transaction>[];

  @OneToMany(() => UserRoleTable, (userRoleTable) => userRoleTable.role)
  userRolesTables!: Relation<UserRoleTable[]>;

  @ManyToOne(() => Table, (table) => table.childTables, { nullable: true })
  @JoinColumn({ name: 'parentTableId' })
  parentTable?: Table;

  @OneToMany(() => Table, (table) => table.parentTable)
  childTables?: Table[];
}
