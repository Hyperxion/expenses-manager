import { TransactionCategory } from './entities/transaction-category.entity';
import { CreateTransactionCategoryDto } from './dto/create-transaction-category.dto';
import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { processError } from '../constants';
import { BaseRepository } from '../BaseRepository';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TransactionCategoriesRepository extends BaseRepository<TransactionCategory> {
  constructor(dataSource: DataSource) {
    super(TransactionCategory, dataSource);
  }

  async createBulkCategories(categories: TransactionCategory[]) {
    try {
      await this.dataSource.transaction(async (manager) => {
        await manager.save(TransactionCategory, categories);
      });
    } catch (error: any) {
      processError(error, TransactionCategory.name);
      throw error; // rethrow so that the transaction is rolled back
    }
  }

  async createCategory(
    createTransactionCategoryDto: CreateTransactionCategoryDto,
  ) {
    try {
      const store = this.create(createTransactionCategoryDto);
      const user = new User();
      user.id = createTransactionCategoryDto.userId;

      store.user = user;
      await this.save(store);

      return store;
    } catch (error: any) {
      processError(error, TransactionCategory.name);
    }
  }
}
