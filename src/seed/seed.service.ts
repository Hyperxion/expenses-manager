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
import { USERS, USERS_DEV } from '../test-utils/db-data/users';
import { TransactionTypesService } from '../transaction-types/transaction-types.service';
import { TXTYPES } from '../test-utils/db-data/txTypes';
import { TABLES, TABLES_DEV } from '../test-utils/db-data/tables';
import { CreateTableDto } from '../tables/dto/create-table.dto';
import { UserRoleTableDto } from '../user-role-table/dto/userRoleTable.dto';
import {
  USER_ROLES_TABLES,
  USER_ROLES_TABLES_DEV,
} from '../test-utils/db-data/userRoleTable';
import { RegisterUserDto } from '../auth/dto/registerUser.dto';
import { importCsvTransactions, loadCsvFile } from '../utils/csvImporter';
import { CSV_TEST_FILES } from '../test-utils/db-data/csv/csvFiles';
import { TransactionCategoriesService } from '../transaction-categories/transaction-categories.service';
import { TransactionCategory } from '../transaction-categories/entities/transaction-category.entity';
import { Tag } from '../tags/entities/tag.entity';
import { Transaction } from '../transactions/entities/transaction.entity';

@Injectable()
export class SeedService {
  constructor(
    private loggerService: LoggerService,
    private dataSource: DataSource,
    private currenciesService: CurrenciesService,
    private rolesService: RolesService,
    private usersService: UsersService,
    private transactionTypesService: TransactionTypesService,
    private tablesService: TablesService,
    private transactionCategoriesService: TransactionCategoriesService,
    private tagsService: TagsService,
    private transactionsService: TransactionsService,
    private beneficiariesService: BeneficiariesService,
    private storesService: StoresService,
  ) {}

  async seedDatabase() {
    try {
      if (process.env.ENVIRONMENT === 'dev') {
        await this.dataSource.synchronize(true); // true drops the db before synchronizing
        console.log(`-----> Database has been erased.`);

        await this.loadProdData();
        await this.loadDevData();
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
      await this.insertTxTypes();
      await this.insertUsers(USERS);
      await this.insertTables(TABLES);
      await this.insertUsersRolesTables(USER_ROLES_TABLES);

      console.log(`-----> Production data has been loaded.`);
    } catch (error) {
      console.log(`-----> error is: ${JSON.stringify(error, null, 2)}`);
    }
  }

  private async loadDevData() {
    try {
      await this.insertUsers(USERS_DEV);
      await this.insertTables(TABLES_DEV);
      await this.insertUsersRolesTables(USER_ROLES_TABLES_DEV);
      await this.importCsvTestData();

      console.log(`-----> Development data has been loaded.`);
    } catch (error) {
      console.log(`-----> error is: ${JSON.stringify(error, null, 2)}`);
    }
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

  private async insertUsers(users: RegisterUserDto[]) {
    const newUsers = await this.usersService.bulkCreate(users);
    console.log(
      `-----> Users inserted into databas: ${JSON.stringify(newUsers, null, 2)}`,
    );
  }

  private async insertTxTypes() {
    const types = await this.transactionTypesService.bulkCreate(TXTYPES);
    console.log(
      `-----> Transaction types inserted into databas: ${JSON.stringify(types, null, 2)}`,
    );
  }

  private async insertTables(tables: CreateTableDto[]) {
    const newTables = await this.tablesService.bulkCreate(tables);
    console.log(
      `-----> Tables inserted into databas: ${JSON.stringify(newTables, null, 2)}`,
    );
  }

  private async insertUsersRolesTables(userRoleTables: UserRoleTableDto[]) {
    const assignments =
      await this.rolesService.assignUsersRolesTables(userRoleTables);
    console.log(
      `-----> Users and Roles has been assigned to the tables: ${JSON.stringify(assignments, null, 2)}`,
    );
  }

  private async importCsvTestData() {
    try {
      const csvTransactions = await loadCsvFile(CSV_TEST_FILES[0]);
      const user = await this.usersService.findById(USERS[0].id!);

      let allCategories: TransactionCategory[] = [];
      let allTags: Tag[] = [];
      let transactions: Transaction[] = [];

      if (!csvTransactions) {
        throw Error('Test CSV File is missing!');
      }

      if (!user) {
        throw Error('User not found!');
      }

      importCsvTransactions(
        csvTransactions,
        this.tagsService,
        this.transactionCategoriesService,
        this.transactionsService,
        user.id!,
      );
    } catch (error) {
      console.log(`-----> error is: ${JSON.stringify(error, null, 2)}`);
    }
  }
}
