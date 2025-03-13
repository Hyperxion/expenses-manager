import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RolesRepository } from './roles.repository';
import { UserRoleTableModule } from '../user-role-table/userRoleTable.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), UserRoleTableModule],
  controllers: [RolesController],
  providers: [RolesService, RolesRepository],
  exports: [RolesService],
})
export class RolesModule {}
