import { Injectable, NotFoundException } from '@nestjs/common';
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
import { Tag } from '../tags/entities/tag.entity';
import { TagsRepository } from '../tags/tags.repository';

@Injectable()
export class TransactionsRepository extends BaseRepository<Transaction> {
  constructor(dataSource: DataSource) {
    super(Transaction, dataSource);
  }

  async createBulkTransactions(transactions: Transaction[]): Promise<void> {
    try {
      await this.dataSource.transaction(async (manager) => {
        await manager.save(Transaction, transactions);
      });
    } catch (error: any) {
      processError(error, Transaction.name);
      throw error;
    }
  }

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    try {
      const tags: Tag[] = [];

      if (createTransactionDto.tagIds) {
        const tagRepository: TagsRepository = new TagsRepository(
          this.dataSource,
        );

        for (const tagId of createTransactionDto.tagIds) {
          const tag = await tagRepository.findOneBy({ id: tagId });

          if (tag) {
            tags.push(tag);
          } else {
            tags.length = 0;
            throw new NotFoundException(`Tag with ID ${tagId}`);
          }
        }
      }

      const user = await this.dataSource.getRepository(User).findOne({
        where: { id: createTransactionDto.userId },
        select: ['id'],
      });
      if (!user)
        throw new NotFoundException(
          `User with ID ${createTransactionDto.userId}`,
        );

      const type = await this.dataSource
        .getRepository(TransactionType)
        .findOne({
          where: { id: createTransactionDto.typeId },
          select: ['id'],
        });
      if (!type)
        throw new NotFoundException(
          `Transaction Type with ID ${createTransactionDto.typeId}`,
        );

      const category = await this.dataSource
        .getRepository(TransactionCategory)
        .findOne({
          where: { id: createTransactionDto.categoryId },
          select: ['id'],
        });
      if (!category)
        throw new NotFoundException(
          `Transaction Category with ID ${createTransactionDto.typeId}`,
        );

      const beneficiary = await this.dataSource
        .getRepository(Beneficiary)
        .findOne({
          where: { id: createTransactionDto.categoryId },
          select: ['id'],
        });
      if (!beneficiary)
        throw new NotFoundException(
          `Beneficiary with ID ${createTransactionDto.beneficiaryId}`,
        );

      const currency = await this.dataSource.getRepository(Currency).findOne({
        where: { id: createTransactionDto.currencyId },
        select: ['id'],
      });
      if (!currency)
        throw new NotFoundException(
          `Currency with ID ${createTransactionDto.currencyId}`,
        );

      const store = await this.dataSource.getRepository(Store).findOne({
        where: { id: createTransactionDto.storeId },
        select: ['id'],
      });
      if (!store)
        throw new NotFoundException(
          `Store with ID ${createTransactionDto.storeId}`,
        );

      const table = await this.dataSource.getRepository(Table).findOne({
        where: { id: createTransactionDto.tableId },
        select: ['id'],
      });
      if (!table)
        throw new NotFoundException(
          `Table with ID ${createTransactionDto.tableId}`,
        );

      const transaction = this.create(createTransactionDto);

      transaction.user = user;
      transaction.type = type;
      transaction.category = category;
      transaction.beneficiary = beneficiary;
      transaction.currency = currency;
      transaction.store = store;
      transaction.table = table;
      transaction.tags = tags;

      await this.save(transaction);

      return transaction;
    } catch (error: any) {
      if (error.status == 404) {
        processError({ message: '404' }, error.message);
      } else {
        processError(error, Transaction.name);
      }
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
      .leftJoin('transaction.tags', 'tags')
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
        'tags.id',
        'tags.name',
      ])
      .getMany();
  }
}
