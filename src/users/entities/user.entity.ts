import { Table } from '../../tables/entities/table.entity';
import { BIG_RANGE } from '../../test-utils/test.constants';
import { UsersMetadata } from '../../test-utils/testMetadata';
import {
  getRandomValueFromArray,
  randomNumber,
} from '../../test-utils/util-functions';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  email: string;

  // @OneToMany(() => Table, (table) => table.user)
  // tables: Relation<Table>[];

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
  /**
   * The default constructor generates instance of a class with random property values.
   *  Meant for creating testing data
   */
  constructor() {
    this.id = uuidv4();
    this.username =
      getRandomValueFromArray(UsersMetadata.NAMES) + randomNumber(BIG_RANGE);
    this.password =
      getRandomValueFromArray(UsersMetadata.SURENAMES) +
      randomNumber(BIG_RANGE);
  }
}
