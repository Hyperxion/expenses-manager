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
import { TagsRepository } from '../tags/tags.repository';
import { TagsService } from '../tags/tags.service';
import { TransactionCategoriesService } from '../transaction-categories/transaction-categories.service';
import { Currency } from '../currencies/entities/currency.entity';
import { User } from '../users/entities/user.entity';
import { TransactionCategory } from '../transaction-categories/entities/transaction-category.entity';
import { TransactionRow } from './interfaces/transaction-row';
import { Tag } from '../tags/entities/tag.entity';

@ApiTags('Transactions')
@UseGuards(AuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly tagsService: TagsService,
    private readonly categoryService: TransactionCategoriesService,
  ) {}

  @Post('import-csv')
  @UseInterceptors(FileInterceptor('file'))
  async importCsv(
    @UploadedFile() file: Express.Multer.File,
    @GetUserId() userId: string,
  ): Promise<any> {
    try {
      const transactions = file?.buffer.toString();

      if (!transactions) throw new Error('404');

      const newTags: string[] = [];
      const newCategories: string[] = [];
      const results: Transaction[] = [];
      const stream = Readable.from(file.buffer);
      const currentTags = await this.tagsService.findAll({
        where: { user: { id: userId } },
      });
      const currentCategories = await this.categoryService.findAll();

      return new Promise((resolve, reject) => {
        stream
          .pipe(csv())
          .on('data', async (row: TransactionRow) => {
            const transaction = new Transaction();
            const date = parseDateToUTC(row.date);
            const tags = row.tags.split(';');

            transaction.amount = +row.amount;
            transaction.date = date;
            transaction.category = new TransactionCategory();
            transaction.category.name = row.category;
            transaction.note = row.note;
            transaction.tags = [];
            transaction.currency = new Currency();
            // TODO: Will be dynamicaly loaded from userSettings.prefferedCurrency
            transaction.currency.id = Constants.Currencies.EUR;
            transaction.user = new User();
            transaction.user.id = userId;

            // If tag from CSV file exists in database, replace with DB record
            // If not, create new instance
            tags.forEach((tag) => {
              const matchingTag = currentTags.find(
                (currentTag) => tag === currentTag.name,
              );
              if (matchingTag) {
                transaction.tags.push(matchingTag);
              } else {
                const newTag = new Tag();
                newTag.name = tag;
                transaction.tags.push(newTag);
                newTags.push(newTag.name);
              }
            });

            const matchingCategory = currentCategories.find(
              (category) => category.name === row.category,
            );

            if (matchingCategory) {
              transaction.category = matchingCategory;
            } else {
              const newCategory = new TransactionCategory();
              newCategory.name = row.category;
              newCategories.push(row.category);
              transaction.category = newCategory;
            }

            results.push(transaction);
          })
          .on('end', async () => {
            try {
              console.log(
                `-----> newTags detected: ${JSON.stringify(newTags, null, 2)}`,
              );

              console.log(
                `-----> newCategories detected: ${JSON.stringify(newCategories, null, 2)}`,
              );
              // console.log(
              //   `-----> results is: ${JSON.stringify(results, null, 2)}`,
              // );
              resolve(results); // Here you can process or return the parsed CSV data
            } catch (error) {}
          })
          .on('error', (error) => reject(error));
      });
      //return 'File has been processed';
    } catch (error) {
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
