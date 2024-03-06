import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getUsers() {
    const users = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .getMany();

    return users;
  }
}
