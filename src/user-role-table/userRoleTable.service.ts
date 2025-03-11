import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { UserRoleTablesRepository } from './userRoleTable.repository';

@Injectable()
export class UserRoleTableService {
  constructor(
    private loggerService: LoggerService,
    private userRoleTableRepository: UserRoleTablesRepository,
  ) {}

  async create() {
    console.log(`-----> test`);
  }
}
