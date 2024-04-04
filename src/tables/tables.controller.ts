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
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { GetUserId } from '../auth/getUserId.decorator';

@ApiTags('tables')
@UseGuards(AuthGuard)
@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  create(@Body() createTableDto: CreateTableDto, @GetUserId() userId: string) {
    createTableDto.userId = userId;
    return this.tablesService.create(createTableDto);
  }

  @Get()
  /**
   * Get tables of currently logged in user.
   *
   * For getting tables of any user, see UsersController.getUserTables
   */
  findAll(@GetUserId() userId: string) {
    return this.tablesService.getUserTables(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tablesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tablesService.update(+id, updateTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tablesService.remove(+id);
  }
}
