import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { LoggerService } from '../logger/logger.service';
import { GetUserId } from '../auth/getUserId.decorator';

@ApiTags('users')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly logger: LoggerService,
    private readonly usersService: UsersService,
  ) {}

  @Get('/')
  async getAll() {
    try {
      return this.usersService.findAll();
    } catch (error) {
      this.logger.error(
        'Error occured',
        error,
        `${UsersController.name}.getAll()`,
      );
    }
  }
}
