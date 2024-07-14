import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { EntityTemplate } from '../../interfaces/EntityTemplate';

@Entity()
export class Tag extends EntityTemplate {
  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ManyToOne(() => User, (user) => user.tags)
  user: Relation<User>;
}
