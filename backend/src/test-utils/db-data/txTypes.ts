import { Constants } from '../../constants';
import { TransactionType } from '../../transaction-types/entities/transaction-type.entity';

export const TXTYPES: TransactionType[] = [
  {
    id: Constants.TxTypes.Debet,
    type: 'Debet',
  },
  {
    id: Constants.TxTypes.Credit,
    type: 'Credit',
  },
];
