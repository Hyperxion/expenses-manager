import { CreateCurrencyDto } from '../../src/currencies/dto/create-currency.dto';
import { Constants } from '../../src/constants';

export const CURRENCIES: CreateCurrencyDto[] = [
  {
    id: Constants.Currencies.USD,
    abbreviation: 'USD',
    name: 'Dollar',
  },
  {
    id: Constants.Currencies.USD,
    abbreviation: 'EUR',
    name: 'Euro',
  },
  {
    id: Constants.Currencies.USD,
    abbreviation: 'CZK',
    name: 'Czech Crown',
  },
];
