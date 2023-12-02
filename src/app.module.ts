import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASEENV } from './environments';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      host: DATABASEENV.host,
      username: DATABASEENV.username,
      password: DATABASEENV.password,
      database: DATABASEENV.database,
      ssl: true,
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
