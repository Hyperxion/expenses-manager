import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export default async (): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  autoLoadEntities: true,
  synchronize: true,
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'expenses',
});

// export const dataSource: TypeOrmModuleOptions = {
//   type: 'postgres',
//   autoLoadEntities: true,
//   synchronize: true,
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'postgres',
//   database: 'expenses',
// }