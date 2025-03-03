import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../BaseRepository';
import { Currency } from './entities/currency.entity';
import { processError } from '../constants';

@Injectable()
export class CurrenciesRepository extends BaseRepository<Currency> {
  constructor(dataSource: DataSource) {
    super(Currency, dataSource);
  }

  async createBulkCurrencies(currencies: Currency[]) {
    try {
      await this.dataSource.transaction(async (manager) => {
        await manager.save(Currency, currencies);
      });

      return currencies;
    } catch (error) {
      processError(error, Currency.name);
      console.log(
        `-----> error currency repo is: ${JSON.stringify(error, null, 2)}`,
      );
    }
  }
}
