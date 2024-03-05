import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './dataSource';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(dataSource),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}