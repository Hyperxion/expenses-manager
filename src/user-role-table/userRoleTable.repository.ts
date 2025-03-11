import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../BaseRepository';
import { UserRoleTable } from './entities/userRoleTable.entity';

@Injectable()
export class UserRoleTablesRepository extends BaseRepository<UserRoleTable> {
  constructor(dataSource: DataSource) {
    super(UserRoleTable, dataSource);
  }
}
