import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { DATABASEENV, MODE } from 'src/environments';

export const TypeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  port: DATABASEENV.port,
  host: DATABASEENV.host,
  username: DATABASEENV.username,
  password: DATABASEENV.password,
  database: DATABASEENV.database,
  ssl: true,
  entities: [__dirname + '/../../**/*.entity.{js,ts}'],
  synchronize: false,
  logging: MODE === 'dev',
};
