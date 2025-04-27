import { LoggerService } from '../logger/logger.service';
import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsRepository } from './transactions.repository';
import { Tag } from '../tags/entities/tag.entity';
import { TransactionCategory } from '../transaction-categories/entities/transaction-category.entity';
import { Transaction } from './entities/transaction.entity';
import { TagsRepository } from '../tags/tags.repository';
import { TransactionCategoriesRepository } from '../transaction-categories/transaction-categories.repository';

@Injectable()
export class TransactionsService {
  constructor(
    private loggerService: LoggerService,
    private transactionsRepository: TransactionsRepository,
    private tagsRepository: TagsRepository,
    private transactionCategoriesRepository: TransactionCategoriesRepository,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    return await this.transactionsRepository.createTransaction(
      createTransactionDto,
    );
  }

  async bulkCreate(transactions: Transaction[]) {
    return await this.transactionsRepository.bulkCreate(transactions);
  }

  async importTransactions(
    newTags: Tag[],
    newCategories: TransactionCategory[],
    transactions: Transaction[],
  ) {
    // use transaction to bulk create new tags using tags repository
    // use transaction to bulk create new transaction Categories using transactionCategories Repository
    // use transaction to bulk create new transactions TransactionsRepository tags repository
    await this.tagsRepository.createBulkTags(newTags);
    await this.transactionCategoriesRepository.bulkCreate(newCategories);
    await this.transactionsRepository.createBulkTransactions(transactions);
  }

  async findAll() {
    return await this.transactionsRepository.findAllWithDetails();
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

  async deleteAll() {
    return await this.transactionsRepository.deleteAll();
  }
}
