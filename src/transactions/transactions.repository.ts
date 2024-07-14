import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { processError } from '../constants';
import { BaseRepository } from '../BaseRepository';
import { User } from '../users/entities/user.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { TransactionType } from '../transaction-types/entities/transaction-type.entity';
import { TransactionCategory } from '../transaction-categories/entities/transaction-category.entity';
import { Beneficiary } from '../beneficiaries/entities/beneficiary.entity';
import { Currency } from '../currencies/entities/currency.entity';
import { Store } from '../stores/entities/store.entity';
import { Table } from '../tables/entities/table.entity';

@Injectable()
export class TransactionsRepository extends BaseRepository<Transaction> {
  constructor(dataSource: DataSource) {
    super(Transaction, dataSource);
  }

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    try {
      const user = new User();
      user.id = createTransactionDto.userId;

      const type = new TransactionType();
      type.id = createTransactionDto.typeId;

      const category = new TransactionCategory();
      category.id = createTransactionDto.categoryId;

      const beneficiary = new Beneficiary();
      beneficiary.id = createTransactionDto.beneficiaryId;

      const currency = new Currency();
      currency.id = createTransactionDto.currencyId;

      const store = new Store();
      store.id = createTransactionDto.storeId;

      const table = new Table();
      table.id = createTransactionDto.tableId;

      const transaction = this.create(createTransactionDto);

      transaction.user = user;
      transaction.type = type;
      transaction.category = category;
      transaction.beneficiary = beneficiary;
      transaction.currency = currency;
      transaction.store = store;
      transaction.table = table;

      await this.save(transaction);

      return transaction;
    } catch (error) {
      processError(error, Transaction.name);
    }
  }

  /**
   *
   * @returns all user transactions with details
   */
  async findAllWithDetails() {
    return await this.dataSource
      .getRepository(Transaction)
      .createQueryBuilder('transaction')
      .leftJoin('transaction.type', 'type')
      .leftJoin('transaction.category', 'category')
      .leftJoin('transaction.beneficiary', 'beneficiary')
      .leftJoin('transaction.currency', 'currency')
      .leftJoin('transaction.store', 'store')
      .leftJoin('transaction.table', 'table')
      .select([
        'transaction.id',
        'transaction.date',
        'transaction.note',
        'transaction.amount',
        'type.id',
        'type.type',
        'category.id',
        'category.name',
        'beneficiary.id',
        'beneficiary.name',
        'currency.name',
        'store.id',
        'store.name',
        'table.id',
        'table.name',
      ])
      .getMany();
  }
}
