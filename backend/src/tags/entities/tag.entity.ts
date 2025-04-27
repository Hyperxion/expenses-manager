import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, ManyToOne, Relation } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { EntityTemplate } from '../../interfaces/entityTemplate';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity()
export class Tag extends EntityTemplate {
  @ApiProperty()
  @Column({ unique: true })
  name!: string;

  @ManyToOne(() => User, (user) => user.tags)
  user!: Relation<User>;

  @ManyToMany(() => Transaction)
  transactions!: Relation<Transaction[]>;
}
