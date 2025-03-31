import path from 'path';
import * as fs from 'fs';
import csv from 'csv-parser';
import { CsvTransaction } from './csvTransaction';
import { TransactionCategoriesService } from '../transaction-categories/transaction-categories.service';
import { TransactionCategory } from '../transaction-categories/entities/transaction-category.entity';
import { User } from '../users/entities/user.entity';
import { TagsService } from '../tags/tags.service';
import { Tag } from '../tags/entities/tag.entity';
import { TransactionsService } from '../transactions/transactions.service';
import { Transaction } from '../transactions/entities/transaction.entity';
import { Constants, parseDateToUTC } from '../constants';
import { Currency } from '../currencies/entities/currency.entity';

/**
 * Loads csv file based on it's file name and path. Default path is `src/test-utils/db-data/csv/`
 * for testing purposes or automatic data loading
 *
 * Returns array of simple csv transaction objects.
 */
export async function loadCsvFile(
  fileName: string,
  folder: string = 'src/test-utils/db-data/csv/',
): Promise<CsvTransaction[]> {
  const filePath = path.join(process.cwd(), folder, fileName);
  const transactions: CsvTransaction[] = [];

  console.log(`-----> Reading file from path: ${filePath}`);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    throw new Error(`File ${filePath} not found!`);
  }

  // Use a stream to read the file
  const stream = fs.createReadStream(filePath).pipe(csv());

  for await (const row of stream) {
    const transaction: CsvTransaction = {
      date: parseDateToUTC(row._0),
      ammount: row._1.replace(/[^\d,.-]/g, '').replace(',', '.'),
      type: row._2,
      categoryName: row._3,
      tags: row._4,
      note: row._5,
    };

    transactions.push(transaction);
  }

  console.log('-----> CSV file processing completed.');
  console.log(
    `-----> ${transactions.length} transactions processed from file ${fileName}`,
  );
  return transactions;
}

/**
 * Processes all transaction categories from csv transactions and determines which are new and need to be inserted
 * into database.
 *
 * @param csvTransactions contains simple transaction from csv file
 * @param transactionCategoriesService is used to create new categories
 * @param userId is set to determine tag ownership
 *
 * @returns list of all categories including newly created.
 */
export async function processCsvCategories(
  csvTransactions: CsvTransaction[],
  transactionCategoriesService: TransactionCategoriesService,
  userId: string,
): Promise<TransactionCategory[]> {
  // Step 1: Load all categories from the DB at once to minimize DB calls
  const existingCategories = await transactionCategoriesService.findAll();

  const existingCategoryNames = new Set(
    existingCategories.map((category) => category.name),
  );

  // Step 2: Extract unique categories from CSV transactions
  const uniqueCsvCategories = new Set(
    csvTransactions.map((transaction) => transaction.categoryName),
  );

  // Step 3: Compare and find categories that are in the CSV but not in the DB
  const categoriesToBeCreated: TransactionCategory[] = [];

  uniqueCsvCategories.forEach((categoryName) => {
    if (!existingCategoryNames.has(categoryName)) {
      const category = new TransactionCategory();
      const user = new User();

      user.id = userId;
      category.name = categoryName;
      category.user = user;

      categoriesToBeCreated.push(category);
    }
  });

  console.log(`-----> Importing ${categoriesToBeCreated.length} categories.`);
  await transactionCategoriesService.bulkCreate(categoriesToBeCreated);

  // Return the list of new categories that need to be created
  return categoriesToBeCreated.concat(existingCategories);
}

/**
 * Processes all tags from csv transactions and determines which are new and need to be inserted
 * into database.
 *
 * @param csvTransactions contains simple transaction from csv file
 * @param tagsService is used to create new tags
 * @param userId is set to determine tag ownership
 *
 * @returns list of all tags including newly created.
 */
export async function processCsvTags(
  csvTransactions: CsvTransaction[],
  tagsService: TagsService,
  userId: string,
) {
  // Step 1: Load all tags from the DB at once to minimize DB calls
  const existingTags = await tagsService.findAll();
  const existingTagNames = new Set(existingTags.map((tag) => tag.name));

  // Step 2: Extract unique tags from CSV transactions
  const uniqueCsvTags = new Set(
    csvTransactions
      .map((transaction) => transaction.tags.split(',')) // Split tags by commas
      .flat() // Flatten the resulting array of arrays
      .map((tag) => tag.trim()), // Optional: remove any extra whitespace
  );

  let tagsToBeCreated: Tag[] = [];

  uniqueCsvTags.forEach((tagName) => {
    if (!existingTagNames.has(tagName)) {
      const tag = new Tag();
      const user = new User();

      user.id = userId;
      tag.name = tagName;
      tag.user = user;

      tagsToBeCreated.push(tag);
    }
  });

  console.log(`-----> Importing ${tagsToBeCreated.length} tags.`);
  tagsToBeCreated = await tagsService.bulkCreate(tagsToBeCreated);

  return tagsToBeCreated.concat(existingTags);
}

/**
 * When importing from CSV file, first a tags and categories must be processed using @processCsvTags
 * and @processCsvCategories which can be called in arbitrary order. After that we have new tags and categories
 * from CSV file in database and therefore we can proceed with transactions insertion.
 *
 * @param csvTransactions - array of simple CSV transaction objects
 * @param transactionsService - service required to insert transactions
 * @param allTags - all tags from DB including tags created in @processCsvTags
 * @param transactionCategoriesFromDB -all transaction categories from DB including new ones created in @processCsvCategories
 * @param userId - owner of transactions to be inserted
 * @param currencyId - should be user's preffered currency from table userSettings.preferredCurrency
 */
export async function createTransactionsFromCsvFile(
  csvTransactions: CsvTransaction[],
  transactionsService: TransactionsService,
  allTags: Tag[],
  transactionCategoriesFromDB: TransactionCategory[],
  userId: string,
  currencyId: string,
) {
  const transactions: Transaction[] = [];

  for (const csvTransaction of csvTransactions) {
    const transaction = new Transaction();
    let tags = csvTransaction.tags.split(',');

    transaction.amount = csvTransaction.ammount;
    transaction.date = csvTransaction.date;
    transaction.note = csvTransaction.note;
    transaction.tags = [];
    transaction.currency = new Currency();
    // TODO: Will be dynamically loaded from userSettings.preferredCurrency
    transaction.currency.id = currencyId;
    transaction.user = new User();
    transaction.user.id = userId;

    const matchingCategory = transactionCategoriesFromDB.find(
      (category) => category.name === csvTransaction.categoryName,
    );

    if (!matchingCategory) {
      throw Error(
        `Error during csv import - category ${csvTransaction.categoryName} does not exists in database!`,
      );
    }

    transaction.category = matchingCategory;

    // Step 1: Loop over tags from the CSV and find matching tags in DB
    tags.forEach((tagName) => {
      // Trim any extra whitespace around tags
      tagName = tagName.trim();

      // Step 2: Find the tag in the tagsFromDB array
      const matchingTag = allTags.find((tag) => tag.name === tagName);

      if (!matchingTag) {
        throw Error(
          `Error during csv import - tag ${tagName} does not exists in database!`,
        );
      }

      // Step 3: If the tag exists, push it to the transaction's tags array
      if (matchingTag) {
        transaction.tags.push(matchingTag);
      }
    });

    transactions.push(transaction);
  }

  return await transactionsService.bulkCreate(transactions);
}

/**
 * Wrapper function for @processCsvCategories @processCsvTags and @createTransactionsFromCsvFile methods
 */
export async function importCsvTransactions(
  csvTransactions: CsvTransaction[],
  tagsService: TagsService,
  transactionCategoriesService: TransactionCategoriesService,
  transactionsService: TransactionsService,
  userId: string,
  currencyId: string = Constants.Currencies.EUR,
) {
  let allCategories: TransactionCategory[] = [];
  let allTags: Tag[] = [];
  let transactions: Transaction[] = [];

  allCategories = await processCsvCategories(
    csvTransactions,
    transactionCategoriesService,
    userId,
  );

  allTags = await processCsvTags(csvTransactions, tagsService, userId);

  transactions = await createTransactionsFromCsvFile(
    csvTransactions,
    transactionsService,
    allTags,
    allCategories,
    userId,
    currencyId,
  );
}
