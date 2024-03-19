import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {});

  describe('findAll', () => {
    it('finds all users', async () => {
      const allUsers = await mockUserRepository.getUsers();

      expect(await usersService.findAll()).toEqual(allUsers);
    });
  });
});
