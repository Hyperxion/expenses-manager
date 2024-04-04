import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from 'typeorm';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { TablesRepository } from './tables.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Table])],
  controllers: [TablesController],
  providers: [TablesService, TablesRepository],
})
export class TablesModule {}
