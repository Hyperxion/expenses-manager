import { TransactionCategory } from './entities/transaction-category.entity';
import { CreateTransactionCategoryDto } from './dto/create-transaction-category.dto';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { processError } from '../constants';
import { BaseRepository } from '../GenericRepository';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TransactionCategoriesRepository extends BaseRepository<TransactionCategory> {
  constructor(dataSource: DataSource) {
    super(TransactionCategory, dataSource);
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
    } catch (error) {
      processError(error, TransactionCategory.name);
    }
  }
}
