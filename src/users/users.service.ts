import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findAll() {
    const users = await this.usersRepository.getUsers();

    return users;
  }

  async findByUsername(username: string) {
    const users = await this.usersRepository.findOne({ where: { username } });

    return users;
  }

  async createUser(registerUserDto: RegisterUserDto) {
    const newUser = await this.usersRepository.createUser(registerUserDto);

    return newUser;
  }
}
