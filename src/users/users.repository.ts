import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterUserDto } from '../auth/dto/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { BaseRepository } from '../BaseRepository';

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource);
  }

  async createUser(registerUserDto: RegisterUserDto) {
    const { username, password } = registerUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return user.username;
  }

  async getUsers(): Promise<User[]> {
    // const users = await this.dataSource
    //   .getRepository(User)
    //   .createQueryBuilder('user')
    //   .getMany();

    return this.find();
  }

  async getByUsername(username: string): Promise<User | null> {
    return await this.findOne({ where: { username } });
  }
}
