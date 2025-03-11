import { Constants } from '../../constants';
import { UserRoleTableDto } from '../../user-role-table/dto/userRoleTable.dto';
import { USERS } from './users';

export const USER_ROLES_TABLES: UserRoleTableDto[] = [
  {
    roleId: Constants.Roles.Admin,
    userId: USERS[0].id!,
    tableId: '',
  },
];
