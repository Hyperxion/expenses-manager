import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TablesRepository } from './tables.repository';
import { Table } from './entities/table.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Table])],
  controllers: [TablesController],
  providers: [TablesService, TablesRepository, UsersService],
  exports: [TablesService],
})
export class TablesModule {}
