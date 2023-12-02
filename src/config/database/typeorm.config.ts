import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { DATABASEENV } from 'src/environments';

export const TypeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  port: 5432,
  host: DATABASEENV.host,
  username: DATABASEENV.username,
  password: DATABASEENV.password,
  database: DATABASEENV.database,
  ssl: true,
  entities: [],
  synchronize: false,
};
