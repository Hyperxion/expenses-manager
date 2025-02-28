import { Constants } from '../../src/constants';
import { TransactionType } from '../../src/transaction-types/entities/transaction-type.entity';

export const CURRENCIES: TransactionType[] = [
  {
    id: Constants.TxTypes.Debet,
    type: 'Debet',
  },
  {
    id: Constants.TxTypes.Credit,
    type: 'Credit',
  },
];
