import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transaction } from './entities/transaction.entity';
import { TransactionsRepository } from './transactions.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from '../tags/tags.module';
import { TransactionCategoriesModule } from '../transaction-categories/transaction-categories.module';
import { TagsRepository } from '../tags/tags.repository';
import { TransactionCategoriesRepository } from '../transaction-categories/transaction-categories.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    TagsModule,
    TransactionCategoriesModule,
  ],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    TransactionsRepository,
    TagsRepository,
    TransactionCategoriesRepository,
  ],
  exports: [TransactionsService],
})
export class TransactionsModule {}
