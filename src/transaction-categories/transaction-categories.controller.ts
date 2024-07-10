import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TransactionCategoriesService } from './transaction-categories.service';
import { CreateTransactionCategoryDto } from './dto/create-transaction-category.dto';
import { UpdateTransactionCategoryDto } from './dto/update-transaction-category.dto';
import { GetUserId } from '../auth/getUserId.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Transaction Categories')
@UseGuards(AuthGuard)
@Controller('transaction-categories')
export class TransactionCategoriesController {
  constructor(
    private readonly transactionCategoriesService: TransactionCategoriesService,
  ) {}

  @Post()
  create(
    @Body() createTransactionCategoryDto: CreateTransactionCategoryDto,
    @GetUserId() userId: string,
  ) {
    createTransactionCategoryDto.userId = userId;
    return this.transactionCategoriesService.create(
      createTransactionCategoryDto,
    );
  }

  @Get()
  async findAll() {
    return this.transactionCategoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.transactionCategoriesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTransactionCategoryDto: UpdateTransactionCategoryDto,
  ) {
    return this.transactionCategoriesService.update(
      id,
      updateTransactionCategoryDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.transactionCategoriesService.remove(id);
  }
}
