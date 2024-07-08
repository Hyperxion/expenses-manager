import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { Store } from './entities/store.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoresRepository } from './stores.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  controllers: [StoresController],
  providers: [StoresService, StoresRepository],
  exports: [StoresService],
})
export class StoresModule {}
