import { CreateTableDto } from '../../tables/dto/create-table.dto';
import { USERS } from './users';

export const TABLES: CreateTableDto[] = [
  {
    id: '88488a05-36c7-4428-b196-e5d1e521d61f',
    name: 'Rok 2024',
    description: 'Výdaje a príjmy za rok 2024',
    user: {
      id: USERS[0].id!,
    },
  },
];
