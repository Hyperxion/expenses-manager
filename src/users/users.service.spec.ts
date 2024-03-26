import { Test } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { MockUsersRepository } from './mockUsersRepository';

describe('UsersService', () => {
  let usersService: UsersService;
  let mockUsersRepository: MockUsersRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useClass: MockUsersRepository },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    mockUsersRepository = moduleRef.get<MockUsersRepository>(UsersRepository);
  });

  describe('findAll', () => {
    it('should return users from repository', async () => {
      const mockUsers = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
      ];
      mockUsersRepository.getUsers.mockResolvedValue(mockUsers);
      const result = await usersService.findAll();

      expect(result).toEqual(mockUsers);
    });
  });
});
