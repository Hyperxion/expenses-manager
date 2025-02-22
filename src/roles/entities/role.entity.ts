import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { EntityTemplate } from '../../interfaces/entityTemplate';

@Entity()
export class Role extends EntityTemplate {
  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ApiProperty()
  @Column()
  description: string;
}
