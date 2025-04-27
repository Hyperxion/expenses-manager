import { TransactionType } from './entities/transaction-type.entity';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../BaseRepository';

@Injectable()
export class TransactionTypesRepository extends BaseRepository<TransactionType> {
  constructor(dataSource: DataSource) {
    super(TransactionType, dataSource);
  }
}
