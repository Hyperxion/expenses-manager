import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { transports } from '../config/winston.config';
import { LoggerService } from './logger.service';

@Global()
@Module({
  imports: [WinstonModule.forRoot(transports[0])],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
