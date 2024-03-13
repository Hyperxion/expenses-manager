import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { User } from './user.entity';
import { IUsersRepo } from './usersRepoI';

export class MockUserRepository implements IUsersRepo {
  async createUser(registerUserDto: RegisterUserDto): Promise<string> {
    return 'randomId';
  }

  async getUsers(): Promise<User[]> {
    return [
      { id: 'id1', password: 'pass1', username: 'user1' },
      { id: 'id2', password: 'pass2', username: 'user2' },
      { id: 'id3', password: 'pass3', username: 'user3' },
    ];
  }
}
