import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { UserRoleTablesRepository } from './userRoleTable.repository';
import { UserRoleTableDto } from './dto/userRoleTable.dto';
import { UserRoleTable } from './entities/userRoleTable.entity';

@Injectable()
export class UserRoleTableService {
  constructor(
    private loggerService: LoggerService,
    private userRoleTableRepository: UserRoleTablesRepository,
  ) {}

  async assignUsersRolesTables(userRolesTables: UserRoleTableDto[]) {
    return await this.userRoleTableRepository.bulkCreate(userRolesTables);
  }
}
