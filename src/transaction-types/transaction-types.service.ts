import { TransactionType } from './entities/transaction-type.entity';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionTypesService extends TypeOrmCrudService<TransactionType> {
  constructor(
    @InjectRepository(TransactionType)
    private transactionTypeRepo: Repository<TransactionType>,
  ) {
    super(transactionTypeRepo);
  }
}
