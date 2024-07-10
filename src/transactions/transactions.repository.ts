import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { processError } from '../constants';
import { BaseRepository } from '../GenericRepository';
import { User } from '../users/entities/user.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsRepository extends BaseRepository<Transaction> {
  constructor(dataSource: DataSource) {
    super(Transaction, dataSource);
  }

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    try {
      const transaction = this.create(createTransactionDto);
      const user = new User();
      user.id = createTransactionDto.userId;

      transaction.user = user;
      await this.save(transaction);

      return transaction;
    } catch (error) {
      processError(error, Transaction.name);
    }
  }
}
