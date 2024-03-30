import { Injectable } from '@nestjs/common';
import { logger } from '../config/winston.config';

@Injectable()
export class LoggerService {
  log(message: string, context?: string, userId?: string) {
    logger.info(`${message}, userId: ${userId}`, { context });
  }

  error(message: string, trace: string, context?: string, userId?: string) {
    logger.error(`${message}, userId: ${userId}`, { context, trace });
  }

  warn(message: string, context?: string, userId?: string) {
    logger.warn(`${message}, userId: ${userId}`, { context });
  }

  debug(message: string, context?: string, userId?: string) {
    logger.debug(`${message}, userId: ${userId}`, { context });
  }
}
