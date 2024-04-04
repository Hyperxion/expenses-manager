import { Injectable, LoggerService } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { TablesRepository } from './tables.repository';

@Injectable()
export class TablesService {
  constructor(
    //private loggerService: LoggerService,
    private tablesRepository: TablesRepository,
  ) {}

  async create(createTableDto: CreateTableDto) {
    const newTable = await this.tablesRepository.createTable(createTableDto);

    return newTable;
  }

  async getUserTables(userId: string) {
    return await this.tablesRepository.getUserTables(userId);
  }

  async findAll() {
    return await this.tablesRepository.find();
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
