import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetUserId } from '../auth/getUserId.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';
import csv from 'csv-parser';
import { Constants, parseDateToUTC, processError } from '../constants';
import { Transaction } from './entities/transaction.entity';
import { TagsService } from '../tags/tags.service';
import { TransactionCategoriesService } from '../transaction-categories/transaction-categories.service';
import { Currency } from '../currencies/entities/currency.entity';
import { User } from '../users/entities/user.entity';
import { TransactionCategory } from '../transaction-categories/entities/transaction-category.entity';
import { Tag } from '../tags/entities/tag.entity';
import { v4 as uuidv4 } from 'uuid';

@ApiTags('Transactions')
@UseGuards(AuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly tagsService: TagsService,
    private readonly categoryService: TransactionCategoriesService,
  ) {}

  // Custom function to clean and format the price
  private formatPrice(price: string): number {
    // Remove all non-numeric characters except comma and dot
    let cleanedPrice = price.replace(/[^\d,\.]/g, '');

    // Replace comma with dot for European format
    cleanedPrice = cleanedPrice.replace(',', '.');

    // Return the price as a number
    return parseFloat(cleanedPrice);
  }

  @Post('import-csv')
  @UseInterceptors(FileInterceptor('file'))
  async importCsv(
    @UploadedFile() file: Express.Multer.File,
    @GetUserId() userId: string,
  ): Promise<any> {
    try {
      const transactions = file?.buffer.toString();

      if (!transactions) throw new Error('404');

      /**
       * `newTags` stores tags extracted from csv file that does not exist as rows in database.
       */
      const newTags: Tag[] = [];
      const newCategories: TransactionCategory[] = [];
      const results: Transaction[] = [];
      const stream = Readable.from(file.buffer);
      const user = new User();
      user.id = userId;

      /**
       * This is a list of tags currently stored in database. When importing new transactions from csv file,
       * we check if there is some new tag which is not in DB yet. If so, we must insert it into database first.
       *
       * `currentTags` stores existing tags in DB
       */
      const currentDBTags = await this.tagsService.findAll({
        where: { user: { id: userId } },
      });

      /**
       * This is a list of transaction categories currently stored in database. When importing new transactions from csv file,
       * we check if there is some new category which is not in DB yet. If so, we must insert it into database first.
       *
       * `currentCategories` stores existing categories in DB
       */
      const currentDBCategories = await this.categoryService.findAll({
        where: { user: { id: userId } },
      });

      return new Promise((resolve, reject) => {
        stream
          .pipe(csv())
          .on('data', async (row: any) => {
            const transaction = new Transaction();
            const tags = row.tags.split(',');
            const date = parseDateToUTC(row.date);

            // Use the custom formatPrice function
            transaction.amount = this.formatPrice(row.amount); // Price formatting here
            transaction.date = date;
            transaction.category = new TransactionCategory();
            transaction.category.name = row.category;
            transaction.note = row.note;
            transaction.tags = [];
            transaction.currency = new Currency();
            // TODO: Will be dynamically loaded from userSettings.preferredCurrency
            transaction.currency.id = Constants.Currencies.EUR;
            transaction.user = new User();
            transaction.user.id = userId;

            /**
             * Each transaction can have multiple tags. Firstly, we must find out if some of theme already exists in DB.
             *
             * `matchingTag` stores tag existing in DB
             */
            tags.forEach((tag) => {
              const matchingTag = currentDBTags.find(
                (currentTag) => tag === currentTag.name,
              );

              /**
               * If there is a match, meaning that tag from csv file already exists, we can assign it to currently processed
               * transaction.
               */
              if (matchingTag) {
                transaction.tags.push(matchingTag);
              } else {
                /**
                 * If there is no match, meaning that tag from csv file does not exist in DB, we must insert it into tags table
                 * before assigning it to transaction, otherwise we'll get error since from DB point of view we are trying to assign
                 * non existing tag to a transaction.
                 */
                const newTag = new Tag();
                newTag.name = tag;

                /**
                 * **Situation:** We have already processed some of the transactions from csv file and we bump into transaction
                 * that contains same tag as previously processed transaction. Note, that this tag is new tag and does not exist in
                 * database. In this case we must prevent this new tag from being inserted again into `newTags` array, since this break UNIQUE
                 * name contrain.
                 *
                 * `csvNewTag` - stores already processed tag from csv file, if there is any. `csvNewTag` is NULL if this is the first
                 * tag occurence in csv file.
                 */
                const csvDuplicateTag = newTags.find(
                  (tag) => newTag.name === tag.name,
                );

                /**
                 * If `existingNewTag` is found, we can safely assing this existing instance to a transaction
                 */
                if (csvDuplicateTag) {
                  // reusing existing instance
                  transaction.tags.push(csvDuplicateTag);
                } else {
                  /**
                   * If `existingNewTag` is not found, we are dealing with new tag and therefore we must create new instance and store it in
                   * `newTags` array which contains tags that does not exist in databse yet and will be bulk-created in next steps before transaction
                   */
                  // creating new instance
                  newTag.id = uuidv4();
                  newTag.user = user;
                  transaction.tags.push(newTag);
                  // New instance is created and we can push it into `newTags` array
                  newTags.push(newTag);
                }
              }
            });

            /**
             * As with tags, we need to do the same checks with categories. The difference is, that one transaction can have only one category
             * whereas a transaction can have multiple tags.
             *
             * `matchingCategory` contains category that already exist in the database, if there is any
             */
            const matchingCategory = currentDBCategories.find(
              (category) => category.name === row.category,
            );

            /**
             * Similary to tags, if there is a match, we can safely assign category to transaction
             */
            if (matchingCategory) {
              transaction.category = matchingCategory;
            } else {
              /**
               * If there is no match, we need to create new instance and store it in `newCategories` array. Again, there is a chance for duplicated
               * category, we must treat that
               */
              const csvDuplicateCategory = newCategories.find(
                (category) => row.category === category.name,
              );

              /**
               * If we have category duplicates in csv file we must not create new instance with the same name but we have to re-use existing
               * instance.
               */
              if (csvDuplicateCategory) {
                // reusing existing instance
                transaction.category = csvDuplicateCategory;
              } else {
                // creating new instance
                const newCategory = new TransactionCategory();
                newCategory.name = row.category;
                newCategory.id = uuidv4();
                newCategory.user = user;
                newCategories.push(newCategory);
                transaction.category = newCategory;
              }
            }

            results.push(transaction);
          })
          .on('end', async () => {
            try {
              await this.transactionsService.importTransactions(
                newTags,
                newCategories,
                results,
              );
              resolve(results); // Here you can process or return the parsed CSV data
            } catch (error: any) {
              console.error('Error during transaction import:', error);
              reject(error);
            }
          })
          .on('error', (error: any) => reject(error));
      });
    } catch (error: any) {
      processError(error, 'File');
    }
  }

  @Post()
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @GetUserId() userId: string,
  ) {
    createTransactionDto.userId = userId;
    return await this.transactionsService.create(createTransactionDto);
  }

  @Get()
  async findAll() {
    return await this.transactionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.transactionsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return await this.transactionsService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.transactionsService.remove(id);
  }
}
