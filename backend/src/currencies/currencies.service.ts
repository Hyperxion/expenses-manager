import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { CurrenciesRepository } from './currencies.repository';
import { CreateCurrencyDto } from './dto/create-currency.dto';

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

  async create(currencyDto: CreateCurrencyDto) {
    const currency = await this.currenciesRepository.create(currencyDto);
    return await this.currenciesRepository.save(currency);
  }

  async bulkCreate(currenciesDto: CreateCurrencyDto[]) {
    return await this.currenciesRepository.bulkCreate(currenciesDto);
  }
}
