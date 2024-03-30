import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { User } from './entities/user.entity';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class UsersService {
  constructor(
    private loggerService: LoggerService,
    private usersRepository: UsersRepository,
  ) {}

  async findAll() {
    this.loggerService.log('this is log', UsersService.name);
    this.loggerService.error(
      'this is error log',
      'stacktrace',
      UsersService.name,
    );
    const users = await this.usersRepository.getUsers();

    return users;
  }

  async findByUsername(username: string) {
    const users = await this.usersRepository.getByUsername(username);

    return users;
  }

  async createUser(registerUserDto: RegisterUserDto) {
    const newUser = await this.usersRepository.createUser(registerUserDto);

    return newUser;
  }
}
