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
 * Processes simple csv transactions - extracts names of categories and compares it with
 * existing categories in database. Then it inserts new categories into database
 *
 * Returns list of categories just created in database
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
  return categoriesToBeCreated;
}

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

  const tagsToBeCreated: Tag[] = [];

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
  await tagsService.bulkCreate(tagsToBeCreated);

  return tagsToBeCreated;
}

export async function createTransactionsFromCsvFile(
  csvTransactions: CsvTransaction[],
  transactionsService: TransactionsService,
  tagsFromDB: Tag[],
  transactionCategoriesFromDB: TransactionCategory[],
  userId: string,
  currencyId: string = Constants.Currencies.EUR,
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
      const matchingTag = tagsFromDB.find((tag) => tag.name === tagName);

      // Step 3: If the tag exists, push it to the transaction's tags array
      if (matchingTag) {
        transaction.tags.push(matchingTag);
      }
    });

    transactions.push(transaction);
  }

  return await transactionsService.bulkCreate(transactions);
}

// TODO process tags - map tags from DB to tags in csvTransaction based on name
// TODO process categories - map categories from DB to categories in csvTransaction based on name
