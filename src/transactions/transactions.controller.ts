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
import { parseDateToUTC, processError } from '../constants';
import { TagsService } from '../tags/tags.service';
import { TransactionCategoriesService } from '../transaction-categories/transaction-categories.service';
import { User } from '../users/entities/user.entity';
import { CsvTransaction } from '../utils/csvTransaction';
import { importCsvTransactions } from '../utils/csvImporter';

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
      // GetUserId() decorator not working
      const uploadedFile = file?.buffer.toString();

      if (!uploadedFile) throw new Error('404');

      const csvTransactions: CsvTransaction[] = [];
      const stream = Readable.from(file.buffer);
      const user = new User();
      user.id = userId;

      const currentDBTags = await this.tagsService.findAll({
        where: { user: { id: userId } },
      });

      const currentDBCategories = await this.categoryService.findAll({
        where: { user: { id: userId } },
      });

      await new Promise<void>((resolve, reject) => {
        stream
          .pipe(
            csv({
              headers: true, // Don't treat the first row as headers
              quote: '"', // Handle quoted strings correctly
            }),
          )
          .on('data', (row: any) => {
            const transaction: CsvTransaction = {
              date: parseDateToUTC(row._0),
              ammount: row._1.replace(/[^\d,.-]/g, '').replace(',', '.'),
              type: row._2,
              categoryName: row._3,
              tags: row._4,
              note: row._5,
            };

            csvTransactions.push(transaction);
          })
          .on('end', () => {
            resolve(); // Resolve when the stream ends
          })
          .on('error', (err) => {
            reject(err); // Reject on error
          });
      });

      await importCsvTransactions(
        csvTransactions,
        this.tagsService,
        this.categoryService,
        this.transactionsService,
        user.id!,
      );

      console.log(
        `-----> results is: ${JSON.stringify(csvTransactions, null, 2)}`,
      );
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
