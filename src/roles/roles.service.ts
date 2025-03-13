import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { LoggerService } from '../logger/logger.service';
import { RolesRepository } from './roles.repository';
import { UserRoleTableService } from '../user-role-table/userRoleTable.service';
import { UserRoleTableDto } from '../user-role-table/dto/userRoleTable.dto';

@Injectable()
export class RolesService {
  constructor(
    private loggerService: LoggerService,
    private rolesRepository: RolesRepository,
    private userRoleTableService: UserRoleTableService,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  async assignUsersRolesTables(userRolesTables: UserRoleTableDto[]) {
    return await this.userRoleTableService.assignUsersRolesTables(
      userRolesTables,
    );
  }

  async bulkCreate(roles: CreateRoleDto[]) {
    return await this.rolesRepository.bulkCreate(roles);
  }
}
