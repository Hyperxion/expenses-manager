import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleTable } from './entities/userRoleTable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoleTable])],
})
export class UserRoleTableModule {}
