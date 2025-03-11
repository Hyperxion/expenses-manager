import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { EntityTemplate } from '../../interfaces/entityTemplate';
import { UserRoleTable } from '../../user-role-table/entities/userRoleTable.entity';

@Entity()
export class Role extends EntityTemplate {
  @ApiProperty()
  @Column({ unique: true })
  name!: string;

  @ApiProperty()
  @Column()
  description!: string;

  @OneToMany(() => UserRoleTable, (userRoleTable) => userRoleTable.role)
  userRolesTables!: Relation<UserRoleTable[]>;
}
