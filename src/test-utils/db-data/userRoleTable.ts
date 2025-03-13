import { Constants } from '../../constants';
import { UserRoleTableDto } from '../../user-role-table/dto/userRoleTable.dto';
import { TABLES, TABLES_DEV } from './tables';
import { USERS } from './users';

export const USER_ROLES_TABLES: UserRoleTableDto[] = [
  {
    role: { id: Constants.Roles.Admin },
    user: { id: USERS[0].id! },
    table: { id: TABLES[0].id! },
  },
];

export const USER_ROLES_TABLES_DEV: UserRoleTableDto[] = [
  {
    role: { id: Constants.Roles.Redactor },
    user: { id: USERS[0].id! },
    table: { id: TABLES_DEV[0].id! },
  },
];
