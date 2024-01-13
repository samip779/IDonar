import { Module } from '@nestjs/common';
import { Gateway } from './gateway';
import { SubscribeMessage } from '@nestjs/websockets';

@Module({
  providers: [Gateway],
})
export class GatewayModule {
  @SubscribeMessage('message')
  handleMessage() {}
}
