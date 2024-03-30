import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(private usersRepository: UsersRepository) {
    super(usersRepository);
  }

  async findAll() {
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
