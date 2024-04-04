import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { CreateTableDto } from './dto/create-table.dto';
import { Table } from './entities/table.entity';

@Injectable()
export class TablesRepository extends Repository<Table> {
  constructor(private dataSource: DataSource) {
    super(Table, dataSource.createEntityManager());
  }

  async createUser(createTableDto: CreateTableDto) {
    try {
      const table = await this.create(createTableDto);
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

  async getTables(): Promise<Table[]> {
    const users = await this.dataSource
      .getRepository(Table)
      .createQueryBuilder('table')
      .getMany();

    return users;
  }

  async getByName(name: string): Promise<Table | null> {
    return await this.findOne({ where: { name: name } });
  }
}
