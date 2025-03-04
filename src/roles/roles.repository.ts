import { DataSource } from 'typeorm';
import { BaseRepository } from '../BaseRepository';
import { Role } from './entities/role.entity';
import { processError } from '../constants';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RolesRepository extends BaseRepository<Role> {
  constructor(dataSource: DataSource) {
    super(Role, dataSource);
  }
}
