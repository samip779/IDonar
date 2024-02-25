import { Module } from '@nestjs/common';
import { BloodRequestsController } from './blood-requests.controller';
import { BloodRequestsService } from './blood-requests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BloodRequest } from './entities/blood-request.entity';
import { AcceptedBloodRequest } from './entities/accepted-blood-request.entity';
import { PushNotificationModule } from '../push-notification/push-notification.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BloodRequest, AcceptedBloodRequest]),
    PushNotificationModule,
    NotificationModule,
  ],
  controllers: [BloodRequestsController],
  providers: [BloodRequestsService],
})
export class BloodRequestsModule {}
