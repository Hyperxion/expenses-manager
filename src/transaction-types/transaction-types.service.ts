import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { TransactionTypesRepository } from './transactionTypesRepository';

@Injectable()
export class TransactionTypesService {
  constructor(
    private loggerService: LoggerService,
    private transacitonTypesRepository: TransactionTypesRepository,
  ) {}

  async findAll() {
    return await this.transacitonTypesRepository.findAllGeneric();
  }
}
