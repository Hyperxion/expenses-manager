import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { DeepPartial } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UserRepository) {}

  async findAll() {
    const users = await this.usersRepository.find();

    return users;
  }

  async registerUser(registerUserDto: DeepPartial<User>) {
    const user = await this.usersRepository.create(registerUserDto);
    await this.usersRepository.save(user);
  }
}
