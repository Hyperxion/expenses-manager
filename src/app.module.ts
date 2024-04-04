import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { configValidationSchema } from './config/config.schema';
import { AuthModule } from './auth/auth.module';
import { TransactionTypesModule } from './transaction-types/transaction-types.module';
import { LoggerService } from './logger/logger.service';
import { LoggerModule } from './logger/logger.module';
import { RolesModule } from './roles/roles.module';
import { TablesModule } from './tables/tables.module';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseConfig,
    }),
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
    }),
    AuthModule,
    UsersModule,
    TransactionTypesModule,
    RolesModule,
    TablesModule,
  ],
  providers: [LoggerService],
})
export class AppModule {}
