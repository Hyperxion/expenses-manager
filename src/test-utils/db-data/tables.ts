import { CreateTableDto } from '../../tables/dto/create-table.dto';
import { USERS } from './users';

export const TABLES: CreateTableDto[] = [
  {
    id: 'a6df3c4b-69aa-41ab-964c-ed07cb8e2c2b',
    name: 'Admin Table',
    description: 'Table linked to admin users',
    user: {
      id: USERS[0].id!,
    },
  },
];

export const TABLES_DEV: CreateTableDto[] = [
  {
    id: '88488a05-36c7-4428-b196-e5d1e521d61f',
    name: 'Rok 2024',
    description: 'Výdaje a príjmy za rok 2024',
    user: {
      id: USERS[0].id!,
    },
  },
];
