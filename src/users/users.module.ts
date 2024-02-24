import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { EmailModule } from '../email/email.module';
import { OtpModule } from '../otp/otp.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EmailModule, OtpModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
