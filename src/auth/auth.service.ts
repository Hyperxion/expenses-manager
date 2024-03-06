import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersRepository } from 'src/users/users.repository';
import { DeepPartial } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async registerUser(registerUserDto: DeepPartial<User>) {
    const user = await this.usersRepository.create(registerUserDto);
    await this.usersRepository.save(user);
  }
}
