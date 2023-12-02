import { DATABASEENV } from 'src/environments';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DATABASEENV.host,
  port: DATABASEENV.port,
  username: DATABASEENV.username,
  password: DATABASEENV.password,
  database: DATABASEENV.database,
  synchronize: false,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  logging: true,
});
