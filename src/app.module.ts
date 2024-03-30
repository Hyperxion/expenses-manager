import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { configValidationSchema } from './config/config.schema';
import { AuthModule } from './auth/auth.module';
import { TransactionTypesModule } from './transaction-types/transaction-types.module';
import { WinstonModule } from 'nest-winston';
import { LoggerService } from './logger/logger.service';
import { LoggerModule } from './logger/logger.module';
import winston from 'winston';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseConfig,
    }),
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
    }),
    LoggerModule,
    AuthModule,
    UsersModule,
    TransactionTypesModule,
    LoggerModule,
  ],
  providers: [LoggerService],
})
export class AppModule {}
