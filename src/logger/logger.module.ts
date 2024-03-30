import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import winston, { transport } from 'winston';
import { transports } from '../config/winston.config';
import { LoggerService } from './logger.service';

@Module({
  imports: [WinstonModule.forRoot(transports[0])],
  providers: [LoggerService],
  exports: [LoggerModule],
})
export class LoggerModule {}
