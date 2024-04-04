import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { CreateTableDto } from './dto/create-table.dto';
import { Table } from './entities/table.entity';
import { User } from '../users/entities/user.entity';

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

  async getTables(): Promise<Table[]> {
    const tables = await this.find();

    return tables;
  }

  async getByName(name: string): Promise<Table | null> {
    return await this.findOne({ where: { name: name } });
  }
}
