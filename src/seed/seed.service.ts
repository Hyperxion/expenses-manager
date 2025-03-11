import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { UsersService } from '../users/users.service';
import { StoresService } from '../stores/stores.service';
import { BeneficiariesService } from '../beneficiaries/beneficiaries.service';
import { CurrenciesService } from '../currencies/currencies.service';
import { TablesService } from '../tables/tables.service';
import { TagsService } from '../tags/tags.service';
import { TransactionsService } from '../transactions/transactions.service';
import { DataSource } from 'typeorm';
import { CURRENCIES_DATA } from '../test-utils/db-data/currencies';
import { RolesService } from '../roles/roles.service';
import { ROLES } from '../test-utils/db-data/roles';
import { USERS } from '../test-utils/db-data/users';
import { TransactionTypesService } from '../transaction-types/transaction-types.service';
import { TXTYPES } from '../test-utils/db-data/txTypes';
import { TABLES } from '../test-utils/db-data/tables';

@Injectable()
export class SeedService {
  constructor(
    private loggerService: LoggerService,
    private dataSource: DataSource,
    private currenciesService: CurrenciesService,
    private rolesService: RolesService,
    private usersService: UsersService,
    private transactionTypesService: TransactionTypesService,
    private transactionsService: TransactionsService,
    private tagsService: TagsService,
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
      await this.insertCurrencies();
      await this.insertRoles();
      await this.insertUsers();
      await this.insertTxTypes();
      await this.insertTables();

      console.log(`-----> Production data has been loaded.`);
    } catch (error) {
      console.log(`-----> error is: ${JSON.stringify(error, null, 2)}`);
    }
  }

  private async loadDevData() {
    console.log(`-----> Development data has been loaded.`);
  }

  private async insertCurrencies() {
    const currencies = await this.currenciesService.bulkCreate(CURRENCIES_DATA);
    console.log(
      `-----> Currencies inserted into database: ${JSON.stringify(currencies, null, 2)}`,
    );
  }

  private async insertRoles() {
    const roles = await this.rolesService.bulkCreate(ROLES);
    console.log(
      `-----> Roles inserted into databas: ${JSON.stringify(roles, null, 2)}`,
    );
  }

  private async insertUsers() {
    const users = await this.usersService.bulkCreate(USERS);
    console.log(
      `-----> Users inserted into databas: ${JSON.stringify(users, null, 2)}`,
    );
  }

  private async insertTxTypes() {
    const types = await this.transactionTypesService.bulkCreate(TXTYPES);
    console.log(
      `-----> Transaction types inserted into databas: ${JSON.stringify(types, null, 2)}`,
    );
  }

  private async insertTables() {
    const tables = await this.tablesService.bulkCreate(TABLES);
    console.log(
      `-----> Tables inserted into databas: ${JSON.stringify(tables, null, 2)}`,
    );
  }
}
