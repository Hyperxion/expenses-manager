import { Test } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { MockUsersRepository } from './mockUsersRepository';

describe('UsersService', () => {
  let usersService: UsersService;
  let mockUsersRepository: MockUsersRepository;

  const mockUsers = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
  ];

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

  it('findAll users', async () => {
    mockUsersRepository.getUsers.mockResolvedValue(mockUsers);
    const result = await usersService.findAll();

    expect(result).toEqual(mockUsers);
  });

  it('findByUsername - finds user by username', async () => {
    mockUsersRepository.getByUsername.mockResolvedValue(mockUsers[0]);
    const user = await usersService.findByUsername(mockUsers[0].name);

    expect(user).toEqual(mockUsers[0]);
  });

  it('findByUsername - does NOT find user', async () => {
    mockUsersRepository.getByUsername.mockResolvedValue(null);
    const user = await usersService.findByUsername('name');

    expect(user).toBeNull();
  });
});
