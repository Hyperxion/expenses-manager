import { CreateCurrencyDto } from '../../currencies/dto/create-currency.dto';
import { Constants } from '../../constants';

export const CURRENCIES_DATA: CreateCurrencyDto[] = [
  {
    id: Constants.Currencies.USD,
    abbreviation: 'USD',
    name: 'Dollar',
  },
  {
    id: Constants.Currencies.EUR,
    abbreviation: 'EUR',
    name: 'Euro',
  },
  {
    id: Constants.Currencies.CZK,
    abbreviation: 'CZK',
    name: 'Czech Crown',
  },
];
