import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../GenericRepository';
import { Currency } from './entities/currency.entity';

@Injectable()
export class CurrenciesRepository extends BaseRepository<Currency> {
  constructor(dataSource: DataSource) {
    super(Currency, dataSource);
  }
}
