import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { IAuthService } from './interfaces/IAuthService';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [UsersModule, EmailModule, JwtModule.register({})],
  providers: [
    {
      provide: IAuthService,
      useClass: AuthService,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
