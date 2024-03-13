import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';

export interface UsersRepoI extends Repository<User> {
  createUser(registerUserDto: RegisterUserDto): Promise<void>;
  getUsers(): Promise<User[]>;
}
