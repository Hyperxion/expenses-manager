import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { User } from './user.entity';
import { DeepPartial } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    const users = await this.usersService.findAll();

    return users;
  }

  @Post('/register')
  async registerUser(@Body() registerUserDto: RegisterUserDto): Promise<void> {
    const users = await this.usersService.registerUser(registerUserDto);
  }
}
