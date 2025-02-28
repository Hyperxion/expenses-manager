import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class UsersService {
  constructor(
    private loggerService: LoggerService,
    private usersRepository: UsersRepository,
  ) {}

  async findAll() {
    return await this.usersRepository.getUsers();
  }

  async findByUsername(username: string) {
    return await this.usersRepository.getByUsername(username);
  }

  async createUser(registerUserDto: RegisterUserDto) {
    return await this.usersRepository.createUser(registerUserDto);
  }

  async deleteAll() {
    return await this.usersRepository.deleteAll();
  }
}
