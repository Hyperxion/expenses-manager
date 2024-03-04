import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "./users/user.entity";

export const dataSource: TypeOrmModuleOptions = {
    type: 'postgres',
    autoLoadEntities: true,
    synchronize: true,
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'expenses',
}