import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleTable } from './entities/userRoleTable.entity';
import { UserRoleTablesRepository } from './userRoleTable.repository';
import { UserRoleTableService } from './userRoleTable.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoleTable])],
  providers: [UserRoleTableService, UserRoleTablesRepository],
  exports: [UserRoleTableService],
})
export class UserRoleTableModule {}
