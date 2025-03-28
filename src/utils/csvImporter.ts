import path from 'path';
import * as fs from 'fs';
import csv from 'csv-parser';
import { CsvTransaction } from './csvTransaction';
import { TransactionCategoriesService } from '../transaction-categories/transaction-categories.service';
import { TransactionCategory } from '../transaction-categories/entities/transaction-category.entity';
import { User } from '../users/entities/user.entity';

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
      date: row._0,
      ammount: row._1.replace(/[^\d,.-]/g, '').replace(',', '.'),
      type: row._2,
      category: row._3,
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
 * Returns list of category names that does not exist in database yet
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
    csvTransactions.map((transaction) => transaction.category),
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

export async function processCsvTags() {}
