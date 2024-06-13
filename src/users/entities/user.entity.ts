import { Table } from '../../tables/entities/table.entity';
import { Tag } from '../../tags/entities/tag.entity';
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

  @OneToMany(() => Table, (table) => table.user)
  tables: Relation<Table>[];

  @OneToMany(() => Tag, (tag) => tag.user)
  tags: Relation<Table>[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  constructor() {}

  /**
   *  Generates instance of a class with random property values.
   *  Meant for creating testing data
   *
   *  TODO: Implement builder pattern
   */
  public static generateTestInstance() {
    const user = new User();
    user.id = uuidv4();
    user.username =
      getRandomValueFromArray(UsersMetadata.NAMES) + randomNumber(BIG_RANGE);
    user.password =
      getRandomValueFromArray(UsersMetadata.SURENAMES) +
      randomNumber(BIG_RANGE);

    return user;
  }
}
