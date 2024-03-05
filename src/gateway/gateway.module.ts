import { Module } from '@nestjs/common';
import { Gateway } from './gateway';
import { SubscribeMessage } from '@nestjs/websockets';
import { GatewayService } from './gateway.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { MessagesModule } from '../messages/messages.module';

@Module({
  imports: [JwtModule.register({}), UsersModule, MessagesModule],
  providers: [Gateway, GatewayService],
})
export class GatewayModule {
  @SubscribeMessage('message')
  handleMessage() {}
}
