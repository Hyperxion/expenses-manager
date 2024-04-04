import { Injectable, LoggerService } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { TablesRepository } from './tables.repository';

@Injectable()
export class TablesService {
  constructor(
    //private loggerService: LoggerService,
    private tablessRepository: TablesRepository,
  ) {}

  async create(createTableDto: CreateTableDto) {
    const newTable = await this.tablessRepository.createUser(createTableDto);

    return newTable;
  }

  findAll() {
    return `This action returns all tables`;
  }

  findOne(id: number) {
    return `This action returns a #${id} table`;
  }

  update(id: number, updateTableDto: UpdateTableDto) {
    return `This action updates a #${id} table`;
  }

  remove(id: number) {
    return `This action removes a #${id} table`;
  }
}
