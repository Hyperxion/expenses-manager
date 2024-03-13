import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { IUsersRepo } from './usersRepoI';
@Injectable()
export class UsersService {
  constructor(private usersRepository: IUsersRepo) {}

  async findAll() {
    const users = await this.usersRepository.getUsers();

    return users;
  }
}
