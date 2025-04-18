import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  const dbType = configService.get('DB_TYPE');
  const dbName = configService.get('DB_NAME');
  const isDev = process.env.ENVIRONMENT === 'dev';

  const commonSettings = {
    autoLoadEntities: true,
    synchronize: isDev ? true : false,
    database: configService.get('DB_NAME'),
  };

  if (dbType === 'postgres') {
    return {
      ...commonSettings,
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
    };
  }

  if (dbType === 'mysql') {
    return {
      ...commonSettings,
      type: 'mysql',
      host: configService.get('MARIA_DB_HOST'),
      port: configService.get('MARIA_DB_PORT'),
      username: configService.get('MARIA_DB_USERNAME'),
      password: configService.get('MARIA_DB_PASSWORD'),
    };
  }

  throw new Error(
    `Unsupported DATABASE type "${dbType}". Use "postgres" or "mysql".`,
  );
};
