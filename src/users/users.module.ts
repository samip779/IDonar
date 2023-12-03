import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUsersService } from './interfaces/IUsersService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [{ provide: IUsersService, useClass: UsersService }],
  exports: [{ provide: IUsersService, useClass: UsersService }],
})
export class UsersModule {}
