import { ApiProperty } from '@nestjs/swagger';
import { BIG_RANGE } from '../test-utils/test.constants';
import { UsersMetadata } from '../test-utils/testMetadata';
import {
  getRandomValueFromArray,
  randomNumber,
} from '../test-utils/util-functions';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  username: string;

  @ApiProperty()
  @Column()
  password: string;

  /**
   * The default constructor generates instance of a class with random property values.
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
