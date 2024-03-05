import { DataSource, EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getUsers() {
    const users = await this.dataSource.getRepository(User).createQueryBuilder("user")
    .where("user.id = :id", { id: 'd2187ebb-c977-406a-9208-2e8ba672be50' })
    .getOne();
    
    return users;
  }
}
