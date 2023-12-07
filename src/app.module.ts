import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TypeORMConfig } from './config/database/typeorm.config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { OtpModule } from './otp/otp.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: () => TypeORMConfig }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    UsersModule,
    AuthModule,
    EmailModule,
    OtpModule,
  ],
  controllers: [],

  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
