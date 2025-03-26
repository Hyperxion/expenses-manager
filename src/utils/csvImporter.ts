import path from 'path';
import * as fs from 'fs';
import csv from 'csv-parser';
import { CreateTransactionDto } from '../transactions/dto/create-transaction.dto';
import { CsvTransaction } from './csvTransaction';

/**
 * Loads csv file based on it's file name and path. Default path is `src/test-utils/db-data/csv/`
 * for testing purposes or automatic data loading
 *
 * Returns array of csv transaction objects.
 */
export async function loadCsvFile(
  fileName: string,
  folder: string = 'src/test-utils/db-data/csv/',
) {
  try {
    // Construct path relative to the root of the project
    const filePath = path.join(process.cwd(), folder, fileName);
    const rows = [];

    console.log(`-----> Reading file from path: ${filePath}`);

    // Read the file content as a string
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      return;
    }

    // Read and process CSV line by line
    const results: any[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        // Log or store the row object
        const transaction: CsvTransaction = {
          date: row._0,
          ammount: row._1.replace(/[^\d,.-]/g, '').replace(',', '.'),
          type: row._2,
          category: row._3,
          tags: row._4,
          note: row._5,
        };

        results.push(transaction);
      })
      .on('end', () => {
        console.log('-----> CSV file processing completed.');
        console.log(
          `-----> ${results.length} transactions precessed from file ${fileName}`,
        );
      })
      .on('error', (error) => {
        console.error('Error reading file:', error);
      });

    return results;
  } catch (error) {
    console.log(`-----> error is: ${JSON.stringify(error, null, 2)}`);
  }
}
