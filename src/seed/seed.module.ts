import { Module } from '@nestjs/common';
import { BeneficiariesService } from '../beneficiaries/beneficiaries.service';
import { CurrenciesService } from '../currencies/currencies.service';
import { StoresService } from '../stores/stores.service';
import { TablesService } from '../tables/tables.service';
import { TagsService } from '../tags/tags.service';
import { TransactionCategoriesService } from '../transaction-categories/transaction-categories.service';
import { TransactionsService } from '../transactions/transactions.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { SeedService } from './seed.service';

@Module({
  imports: [UsersModule],
  providers: [
    SeedService,
    UsersService,
    TransactionsService,
    TagsService,
    TransactionCategoriesService,
    BeneficiariesService,
    CurrenciesService,
    StoresService,
    TablesService,
  ],
  exports: [SeedService],
})
export class SeedModule {}
