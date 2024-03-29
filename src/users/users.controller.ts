import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from '../auth/auth.guard';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ type: User, isArray: true })
  @Get()
  async getUsers(): Promise<User[]> {
    const users = await this.usersService.findAll();

    return users;
  }
}
