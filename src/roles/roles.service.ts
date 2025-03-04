import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { LoggerService } from '../logger/logger.service';
import { RolesRepository } from './roles.repository';

@Injectable()
export class RolesService {
  constructor(
    private loggerService: LoggerService,
    private rolesRepository: RolesRepository,
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

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  async bulkCreate(roles: CreateRoleDto[]) {
    return await this.rolesRepository.bulkCreate(roles);
  }
}
