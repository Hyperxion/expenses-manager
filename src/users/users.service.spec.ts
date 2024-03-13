import { UsersService } from './users.service';
import { MockUserRepository } from './mockUserRepository';

describe('UsersService', () => {
  let usersService: UsersService;
  let mockUserRepository: MockUserRepository;

  beforeEach(async () => {
    mockUserRepository = new MockUserRepository();
    usersService = new UsersService(mockUserRepository);
  });

  describe('findAll', () => {
    it('finds all users', async () => {
      const allUsers = await mockUserRepository.getUsers();

      expect(await usersService.findAll()).toEqual(allUsers);
    });
  });
});
