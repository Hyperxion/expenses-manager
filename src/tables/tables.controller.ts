import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TablesService } from './tables.service';
import { UpdateTableDto } from './dto/update-table.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { GetUserId } from '../auth/getUserId.decorator';
import { CreateTableDto } from './dto/create-table.dto';

@ApiTags('tables')
@UseGuards(AuthGuard)
@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  async create(
    @Body() createTableDto: CreateTableDto,
    @GetUserId() userId: string,
  ) {
    createTableDto.userId = userId;
    return await this.tablesService.create(createTableDto);
  }

  @Get()
  /**
   * Get tables of currently logged in user.
   *
   * For getting tables of any user, see UsersController.getUserTables
   */
  async findAll(@GetUserId() userId: string) {
    return await this.tablesService.getUserTables(userId);
  }

  /**
   * Returns table that belongs to logged user. To get
   * any table of any user, see users.controller.ts
   *
   * @param id - ID of table
   * @param userId - ID uf logged user
   * @returns paricular table of logged user
   */
  @Get(':id')
  async findOne(@Param('id') id: string, @GetUserId() userId: string) {
    return await this.tablesService.findOne(id, userId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTableDto: UpdateTableDto,
    @GetUserId() userId: string,
  ) {
    return await this.tablesService.update(id, userId, updateTableDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.tablesService.remove(+id);
  }
}
