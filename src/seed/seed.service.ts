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

@Injectable()
export class SeedService {
  constructor(
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
    await this.clearData();
    await this.loadProdData();
    if (process.env.ENVIRONMENT === 'dev') {
      await this.loadDevData();
    }
  }

  private async clearData() {
    try {
      const result = await this.usersService.deleteAll();
      console.log(`-----> Users deleted: ${JSON.stringify(result, null, 2)}`);
      await this.transactionsService.deleteAll();
      await this.transactionCategoriesService.deleteAll();
      await this.tagsService.deleteAll();
      await this.beneficiariesService.deleteAll();
      await this.currenciesService.deleteAll();
      await this.storesService.deleteAll();
      await this.tablesService.deleteAll();
    } catch (error) {
      console.log(`-----> error is: ${JSON.stringify(error, null, 2)}`);
    }
  }

  private async loadProdData() {}

  private async loadDevData() {}
}
