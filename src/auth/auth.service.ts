import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { DeepPartial } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async registerUser(registerUserDto: DeepPartial<User>) {
    const user = await this.usersRepository.create(registerUserDto);
    await this.usersRepository.save(user);
  }
}
