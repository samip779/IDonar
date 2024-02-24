import { Module } from '@nestjs/common';
import { PushNotificationService } from './push-notification.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({ maxRedirects: 5, timeout: 10000 })],
  providers: [PushNotificationService],
  exports: [PushNotificationService],
})
export class PushNotificationModule {}
