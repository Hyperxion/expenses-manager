import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Table } from './entities/table.entity';
import { User } from '../users/entities/user.entity';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Injectable()
export class TablesRepository extends Repository<Table> {
  constructor(private dataSource: DataSource) {
    super(Table, dataSource.createEntityManager());
  }

  async createTable(createTableDto: CreateTableDto) {
    try {
      const table = this.create(createTableDto);
      const user = new User();
      user.id = createTableDto.userId;

      table.user = user;

      await this.save(table);

      return table;
    } catch (error) {
      if (error.code === '23505') {
        // duplicate name
        throw new ConflictException('Table name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getUserTables(userId: string) {
    return await this.find({ where: { user: { id: userId } } });
  }

  /**
   * Returns table for particular user
   *
   *
   * @param id - table ID
   * @param userId - user ID
   * @returns table with ID that belongs to user with userId
   */
  async getUserTable(id: string, userId: string) {
    return await this.findOne({
      where: {
        id: id,
        user: { id: userId },
      },
    });
  }

  async getTables(): Promise<Table[]> {
    const tables = await this.find();

    return tables;
  }

  /**
   *
   * @param id - ID of table to update
   * @param userId - ID of user to which table belongs
   * @param updateTableDto - DTO object which store data to update
   */
  async updateUserTable(
    id: string,
    userId: string,
    updateTableDto: UpdateTableDto,
  ) {
    let table = await this.getUserTable(id, userId);

    if (!table) return undefined;

    const updatedTable = { ...table, ...updateTableDto };

    return await this.save(updatedTable);
  }

  async getByName(name: string): Promise<Table | null> {
    return await this.findOne({ where: { name: name } });
  }

  async removeTable(id: string, userId: string) {
    const table = await this.getUserTable(id, userId);
    if (!table) return null;

    return await this.remove(table);
  }
}
