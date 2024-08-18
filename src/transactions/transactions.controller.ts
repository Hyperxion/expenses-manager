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
import { Transaction } from './entities/transaction.entity';
import { TagsRepository } from '../tags/tags.repository';
import { TagsService } from '../tags/tags.service';

@ApiTags('Transactions')
@UseGuards(AuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly tagsService: TagsService,
  ) {}

  @Post('import-csv')
  @UseInterceptors(FileInterceptor('file'))
  async importCsv(@UploadedFile() file: Express.Multer.File): Promise<any> {
    try {
      const transactions = file?.buffer.toString();

      if (!transactions) throw new Error('404');

      const results: Transaction[] = [];
      const stream = Readable.from(file.buffer);
      const currentTags = await this.tagsService.findAll();
      console.log(
        `-----> All tags from DB are: ${JSON.stringify(currentTags, null, 2)}`,
      );
      return new Promise((resolve, reject) => {
        stream
          .pipe(csv())
          .on('data', (row) => {
            const transaction = new Transaction();
            const date = parseDateToUTC(row.date);
            const tags = row.tags.split(';');
            console.log(`-----> tags is: ${JSON.stringify(tags, null, 2)}`);
            transaction.amount = +row.value;
            transaction.date = date;
            transaction.category = row.category;
            transaction.note = row.note;
            transaction.category = row.category;
            transaction.tags;

            console.log(
              `-----> transaction is: ${JSON.stringify(transaction, null, 2)}`,
            );

            results.push(row);
          })
          .on('end', () => {
            //console.log(results);
            resolve(results); // Here you can process or return the parsed CSV data
          })
          .on('error', (error) => reject(error));
      });
      return 'File has been processed';
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
