import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { UsersService } from '../users/users.service';
import { StoresService } from '../stores/stores.service';
import { BeneficiariesService } from '../beneficiaries/beneficiaries.service';
import { CurrenciesService } from '../currencies/currencies.service';
import { TablesService } from '../tables/tables.service';
import { TagsService } from '../tags/tags.service';
import { TransactionCategoriesService } from '../transaction-categories/transaction-categories.service';
import { TransactionsService } from '../transactions/transactions.service';
import { DataSource, getManager } from 'typeorm';
import { Currency } from '../currencies/entities/currency.entity';

@Injectable()
export class SeedService {
  constructor(
    private dataSource: DataSource,
    private loggerService: LoggerService,
    private usersService: UsersService,
    private transactionsService: TransactionsService,
    private tagsService: TagsService,
    private transactionCategoriesService: TransactionCategoriesService,
    private beneficiariesService: BeneficiariesService,
    private currenciesService: CurrenciesService,
    private storesService: StoresService,
    private tablesService: TablesService,
  ) {}

  async seedDatabase() {
    if (process.env.ENVIRONMENT === 'dev') {
      await this.dataSource.synchronize(true); // true drops the db before synchronizing
      console.log(`-----> Database has been erased.`);
      await this.loadProdData();
      await this.loadDevData();
      console.log(`-----> Development data has been loaded.`);
    } else {
      await this.loadProdData();
    }
  }

  private async loadProdData() {
    try {
      const currency: Currency = {
        name: 'Euro',
        abbreviation: 'EUR',
      };

      const result = await this.currenciesService.create(currency);
      console.log(
        `-----> Currency created: ${JSON.stringify(result, null, 2)}`,
      );
    } catch (error) {
      console.log(`-----> error is: ${JSON.stringify(error, null, 2)}`);
    }
  }

  private async loadDevData() {}
}
