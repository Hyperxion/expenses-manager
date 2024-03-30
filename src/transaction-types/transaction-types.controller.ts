import { Controller, Get, UseGuards } from '@nestjs/common';
import { TransactionTypesService } from './transaction-types.service';
import { TransactionType } from './entities/transaction-type.entity';
import { Crud, CrudAuth, CrudController } from '@dataui/crud';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@Crud({
  model: {
    type: TransactionType,
  },
  routes: {
    only: ['getManyBase', 'getOneBase'],
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
})
// Uncomment this to automatically filter data based on userId
// @CrudAuth({
//   filter: (userId: string) => ({
//     id: userId,
//   }),
// })
@ApiTags('transaction-types')
@UseGuards(AuthGuard)
@Controller('transaction-types')
export class TransactionTypesController
  implements CrudController<TransactionType>
{
  constructor(public service: TransactionTypesService) {}
}
