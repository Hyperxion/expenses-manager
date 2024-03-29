import { Module } from '@nestjs/common';
import { TransactionTypesService } from './transaction-types.service';
import { TransactionTypesController } from './transaction-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionType } from './entities/transaction-type.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionType]), AuthModule],
  controllers: [TransactionTypesController],
  providers: [TransactionTypesService],
})
export class TransactionTypesModule {}
