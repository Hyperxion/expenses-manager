import { Module } from '@nestjs/common';
import { TransactionTypesService } from './transaction-types.service';
import { TransactionTypesController } from './transaction-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionType } from './entities/transaction-type.entity';
import { TransactionTypesRepository } from './transactionTypesRepository';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionType])],
  controllers: [TransactionTypesController],
  providers: [TransactionTypesService, TransactionTypesRepository],
  exports: [TransactionTypesService],
})
export class TransactionTypesModule {}
