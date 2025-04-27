import { Controller, Get, UseGuards } from '@nestjs/common';
import { TransactionTypesService } from './transaction-types.service';
import { TransactionType } from './entities/transaction-type.entity';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('transaction-types')
@UseGuards(AuthGuard)
@Controller('transaction-types')
export class TransactionTypesController {
  constructor(
    private readonly transacitonTypesService: TransactionTypesService,
  ) {}

  @Get()
  findAll() {
    return this.transacitonTypesService.findAll();
  }
}
