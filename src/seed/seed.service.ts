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
import { DataSource } from 'typeorm';
import { CURRENCIES_DATA } from '../test-utils/db-data/currencies';

@Injectable()
export class SeedService {
  constructor(
    private loggerService: LoggerService,
    private dataSource: DataSource,
    private currenciesService: CurrenciesService,
    private usersService: UsersService,
    private transactionsService: TransactionsService,
    private tagsService: TagsService,
    private transactionCategoriesService: TransactionCategoriesService,
    private beneficiariesService: BeneficiariesService,
    private storesService: StoresService,
    private tablesService: TablesService,
  ) {}

  async seedDatabase() {
    try {
      if (process.env.ENVIRONMENT === 'dev') {
        await this.dataSource.synchronize(true); // true drops the db before synchronizing
        console.log(`-----> Database has been erased.`);

        await this.loadProdData();
        // await this.loadDevData();
      } else {
        await this.loadProdData();
      }
    } catch (error) {
      console.log(
        `-----> Error seeding database: ${JSON.stringify(error, null, 2)}`,
      );
    }
  }

  private async loadProdData() {
    try {
      const currencies =
        await this.currenciesService.bulkCreate(CURRENCIES_DATA);
      console.log(
        `-----> currencies inserted into database: ${JSON.stringify(currencies, null, 2)}`,
      );
      console.log(`-----> Production data has been loaded.`);
    } catch (error) {
      console.log(`-----> error is: ${JSON.stringify(error, null, 2)}`);
    }
  }

  private async loadDevData() {
    console.log(`-----> Development data has been loaded.`);
  }
}
