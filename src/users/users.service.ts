import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UserRepository) {}

  async findAll() {
    const users = await this.usersRepository.find();

    return users;
  }
}
