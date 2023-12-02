import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASEENV } from './environments';
import { UsersModule } from './users/users.module';
import { TypeORMConfig } from './config/database/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: () => TypeORMConfig }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
