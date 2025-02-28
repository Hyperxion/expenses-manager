import { Constants } from '../../src/constants';
import { CreateRoleDto } from '../../src/roles/dto/create-role.dto';

export const ROLES: CreateRoleDto[] = [
  {
    id: Constants.Roles.Admin,
    description: 'Admin role with all privileges',
    name: 'Admin',
  },
  {
    id: Constants.Roles.Redactor,
    description: `Redactor role which allows to manage owner's content.`,
    name: 'Redactor',
  },
  {
    id: Constants.Roles.CoRedactor,
    description: `CoRedactor role which allows to manage shared content.`,
    name: 'CoRedactor',
  },
  {
    id: Constants.Roles.Reader,
    description: `Reader role which allows to read content of another user.`,
    name: 'Reader',
  },
];
