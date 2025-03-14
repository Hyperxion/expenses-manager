import { Injectable } from '@nestjs/common';
import { UpdateTableDto } from './dto/update-table.dto';
import { TablesRepository } from './tables.repository';
import { LoggerService } from '../logger/logger.service';
import { CreateTableDto } from './dto/create-table.dto';

@Injectable()
export class TablesService {
  constructor(
    private loggerService: LoggerService,
    private tablesRepository: TablesRepository,
  ) {}

  async create(createTableDto: CreateTableDto) {
    const newTable = await this.tablesRepository.createTable(createTableDto);

    return newTable;
  }

  async getUserTables(userId: string) {
    return await this.tablesRepository.getUserTables(userId);
  }

  async createTableWithParent(tableDto: CreateTableDto) {
    return await this.tablesRepository.createTable(tableDto);
  }

  async findAll() {
    return await this.tablesRepository.findAllGeneric();
  }

  async findOne(id: string, userId: string) {
    return await this.tablesRepository.getUserTable(id, userId);
  }

  async update(id: string, userId: string, updateTableDto: UpdateTableDto) {
    return await this.tablesRepository.updateUserTable(
      id,
      userId,
      updateTableDto,
    );
  }

  async remove(id: string, userId: string) {
    return await this.tablesRepository.removeTable(id, userId);
  }

  async deleteAll() {
    return await this.tablesRepository.deleteAll();
  }

  async bulkCreate(tables: CreateTableDto[]) {
    return await this.tablesRepository.bulkCreate(tables as any);
  }
}
