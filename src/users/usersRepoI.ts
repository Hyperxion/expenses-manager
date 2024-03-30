import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { User } from './entities/user.entity';

export interface IUsersRepo {
  createUser(registerUserDto: RegisterUserDto): Promise<string>;
  getUsers(): Promise<User[]>;
}
