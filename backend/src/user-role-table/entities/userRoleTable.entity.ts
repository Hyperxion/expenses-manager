import { Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { EntityTemplate } from '../../interfaces/EntityTemplate';
import { Role } from '../../roles/entities/role.entity';
import { User } from '../../users/entities/user.entity';
import { Table } from '../../tables/entities/table.entity';

@Entity()
export class UserRoleTable extends EntityTemplate {
  @ManyToOne(() => User, (user) => user.userRolesTables)
  @JoinColumn({ name: 'userId' })
  user!: Relation<User | { id: string }>;

  @ManyToOne(() => Role, (role) => role.userRolesTables)
  @JoinColumn({ name: 'roleId' })
  role!: Relation<Role | { id: string }>;

  @ManyToOne(() => Table, (table) => table.userRolesTables)
  @JoinColumn({ name: 'tableId' })
  table!: Relation<Table | { id: string }>;
}
