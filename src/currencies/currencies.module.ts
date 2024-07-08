import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { Currency } from './entities/currency.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrenciesRepository } from './currencies.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Currency])],
  controllers: [CurrenciesController],
  providers: [CurrenciesService, CurrenciesRepository],
  exports: [CurrenciesService],
})
export class CurrenciesModule {}
