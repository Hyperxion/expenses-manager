import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { RegisterUserDto } from './dto/registerUser.dto';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async registerUser(registerUserDto: RegisterUserDto) {
    const user = await this.usersRepository.createUser(registerUserDto);
  }
}
