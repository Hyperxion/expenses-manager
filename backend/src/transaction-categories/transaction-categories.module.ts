import { Module } from '@nestjs/common';
import { TransactionCategoriesService } from './transaction-categories.service';
import { TransactionCategoriesController } from './transaction-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionCategory } from './entities/transaction-category.entity';
import { TransactionCategoriesRepository } from './transaction-categories.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionCategory])],
  controllers: [TransactionCategoriesController],
  providers: [TransactionCategoriesService, TransactionCategoriesRepository],
  exports: [TransactionCategoriesService],
})
export class TransactionCategoriesModule {}
