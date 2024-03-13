import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { createMock } from '@golevelup/ts-jest';
import { DataSource } from 'typeorm';
import { TypeORMMySqlTestingModule } from '../test-utils/TypeORMMySqlTestingModule';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersController: UsersController;
  //let usersRepository: UsersRepository;
  let typeOrmModule: TypeOrmModule;
  let authOrmModule: AuthModule;
  let dataSource: DataSource;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        TypeORMMySqlTestingModule([User]),
        TypeOrmModule.forFeature([User]),
        AuthModule,
      ],
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: createMock<UsersRepository>(),
        },
        {
          provide: DataSource,
          useValue: createMock<DataSource>(),
        },
      ],
      controllers: [UsersController],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UsersController>(UsersController);
    // usersRepository = moduleRef.get<UsersRepository>(UsersRepository);
    authOrmModule = moduleRef.get<AuthModule>(AuthModule);
    typeOrmModule = moduleRef.get<TypeOrmModule>(TypeOrmModule);
    dataSource = moduleRef.get<DataSource>(DataSource);
  });

  describe('findAll', () => {
    it('finds all users', async () => {
      const allUsers = usersService.findAll();
      jest.spyOn(usersService, 'findAll').mockImplementation(() => allUsers);

      expect(await usersController.getUsers).toBe(allUsers);
    });
  });
});

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    // ...
  }),
);
