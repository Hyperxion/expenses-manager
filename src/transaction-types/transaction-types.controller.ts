import { Controller, Get, UseGuards } from '@nestjs/common';
import { TransactionTypesService } from './transaction-types.service';
import { TransactionType } from './entities/transaction-type.entity';
import { Crud, CrudController } from '@dataui/crud';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@Crud({
  model: {
    type: TransactionType,
  },
  routes: {
    only: ['getManyBase'],
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
})
@ApiTags('transaction-types')
@UseGuards(AuthGuard)
@Controller('transaction-types')
export class TransactionTypesController
  implements CrudController<TransactionType>
{
  constructor(public service: TransactionTypesService) {}
}
