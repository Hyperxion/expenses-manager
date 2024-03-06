import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { DeepPartial } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findAll() {
    const users = await this.usersRepository.find();

    return users;
  }
}
