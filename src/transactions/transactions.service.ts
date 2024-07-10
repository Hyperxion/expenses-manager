import { LoggerService } from '../logger/logger.service';
import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsRepository } from './transactions.repository';

@Injectable()
export class TransactionsService {
  constructor(
    private loggerService: LoggerService,
    private transactionsRepository: TransactionsRepository,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    return await this.transactionsRepository.createTransaction(
      createTransactionDto,
    );
  }

  async findAll() {
    return await this.transactionsRepository.findAllGeneric();
  }

  async findOne(id: string) {
    return await this.transactionsRepository.findGeneric({ id });
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return await this.transactionsRepository.updateGeneric(
      id,
      updateTransactionDto,
    );
  }

  async remove(id: string) {
    return await this.transactionsRepository.removeGeneric(id);
  }
}
