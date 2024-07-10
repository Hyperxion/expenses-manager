import { Injectable } from '@nestjs/common';
import { CreateTransactionCategoryDto } from './dto/create-transaction-category.dto';
import { LoggerService } from '../logger/logger.service';
import { TransactionCategoriesRepository } from './transaction-categories.repository';
import { UpdateTransactionCategoryDto } from './dto/update-transaction-category.dto';

@Injectable()
export class TransactionCategoriesService {
  constructor(
    private loggerService: LoggerService,
    private transactionCategoriesRepository: TransactionCategoriesRepository,
  ) {}

  async create(createTransactionCategoryDto: CreateTransactionCategoryDto) {
    return this.transactionCategoriesRepository.createCategory(
      createTransactionCategoryDto,
    );
  }

  async findAll() {
    return await this.transactionCategoriesRepository.findAllGeneric();
  }

  async findOne(id: string) {
    return await this.transactionCategoriesRepository.findGeneric({ id });
  }

  async update(
    id: string,
    updateTransactionCategoryDto: UpdateTransactionCategoryDto,
  ) {
    return await this.transactionCategoriesRepository.updateGeneric(
      id,
      updateTransactionCategoryDto,
    );
  }

  async remove(id: string) {
    return await this.transactionCategoriesRepository.removeGeneric(id);
  }
}
