import { User } from './user.entity';

export class MockUsersRepository {
  getUsers: jest.Mock<any, []>;
  createUser: jest.Mock<any, [User]>;
  getByUsername: jest.Mock<any, [User]>;

  constructor() {
    this.getUsers = jest.fn();
    this.createUser = jest.fn();
    this.getByUsername = jest.fn();
  }
}
