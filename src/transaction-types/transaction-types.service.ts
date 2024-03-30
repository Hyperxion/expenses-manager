import { TransactionType } from './entities/transaction-type.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionTypesService {
  constructor(
    @InjectRepository(TransactionType)
    private transactionTypeRepo: Repository<TransactionType>,
  ) {}
}
