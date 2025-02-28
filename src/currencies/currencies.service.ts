import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { CurrenciesRepository } from './currencies.repository';
import { Currency } from './entities/currency.entity';

@Injectable()
export class CurrenciesService {
  constructor(
    private loggerService: LoggerService,
    private currenciesRepository: CurrenciesRepository,
  ) {}

  async findAll() {
    return await this.currenciesRepository.findAllGeneric();
  }

  async findOne(id: string) {
    return await this.currenciesRepository.findGeneric({ id });
  }

  async deleteAll() {
    return await this.currenciesRepository.deleteAll();
  }

  async create(currency: Currency) {
    return this.currenciesRepository.create(currency);
  }
}
