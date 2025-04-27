import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { LoggerService } from '../logger/logger.service';
import { GetUserId } from '../auth/getUserId.decorator';
import { TablesService } from '../tables/tables.service';

@ApiTags('users')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly logger: LoggerService,
    private readonly usersService: UsersService,
    private readonly tablesService: TablesService,
  ) {}

  @Get('/')
  async getAll(@GetUserId() userId: string) {
    try {
      return this.usersService.findAll();
    } catch (error: any) {
      this.logger.error(
        'Error occured',
        error as string,
        `${UsersController.name}.getAll()`,
        userId,
      );
    }
  }

  @Get('/:userId/tables')
  /**
   * Returns array of any user tables based on provided userId.
   */
  async getUserTables(@Param('userId') userId: string) {
    try {
      return this.tablesService.getUserTables(userId);
    } catch (error: any) {
      this.logger.error(
        'Error occured',
        error as string,
        `${UsersController.name}.getAll()`,
        userId,
      );
    }
  }
}
