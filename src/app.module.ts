import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TypeORMConfig } from './config/database/typeorm.config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { OtpModule } from './otp/otp.module';
import { BloodRequestsModule } from './blood-requests/blood-requests.module';
import { GatewayModule } from './gateway/gateway.module';
import { PushNotificationModule } from './push-notification/push-notification.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: () => TypeORMConfig }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 20,
      },
    ]),
    UsersModule,
    AuthModule,
    EmailModule,
    OtpModule,
    BloodRequestsModule,
    GatewayModule,
    PushNotificationModule,
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
