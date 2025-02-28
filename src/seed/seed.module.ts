import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { SeedService } from './seed.service';
import { TransactionsModule } from '../transactions/transactions.module';
import { TagsModule } from '../tags/tags.module';
import { TransactionCategoriesModule } from '../transaction-categories/transaction-categories.module';
import { BeneficiariesModule } from '../beneficiaries/beneficiaries.module';
import { CurrenciesModule } from '../currencies/currencies.module';
import { StoresModule } from '../stores/stores.module';
import { TablesModule } from '../tables/tables.module';

@Module({
  imports: [
    UsersModule,
    TransactionsModule,
    TagsModule,
    TransactionCategoriesModule,
    BeneficiariesModule,
    CurrenciesModule,
    StoresModule,
    TablesModule,
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
