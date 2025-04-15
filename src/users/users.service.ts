import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { LoggerService } from '../logger/logger.service';
import { RegisterUserDto } from '../auth/dto/registerUser.dto';

@Injectable()
export class UsersService {
  constructor(
    private loggerService: LoggerService,
    private usersRepository: UsersRepository,
  ) {}

  async findAll() {
    return await this.usersRepository.getUsers();
  }

  async findById(id: string) {
    return await this.usersRepository.findOne({
      where: {
        id,
      },
    });
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

  async bulkCreate(users: RegisterUserDto[]) {
    return await this.usersRepository.bulkCreate(users);
  }
}
