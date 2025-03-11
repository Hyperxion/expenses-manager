import { CreateTableDto } from '../../tables/dto/create-table.dto';
import { USERS } from './users';

export const TABLES: CreateTableDto[] = [
  {
    name: 'Rok 2024',
    description: 'Výdaje a príjmy za rok 2024',
    userId: USERS[0].id!,
  },
];
