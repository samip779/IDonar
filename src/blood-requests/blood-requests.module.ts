import { Module } from '@nestjs/common';
import { BloodRequestsController } from './blood-requests.controller';
import { BloodRequestsService } from './blood-requests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BloodRequest } from './entities/blood-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BloodRequest])],
  controllers: [BloodRequestsController],
  providers: [BloodRequestsService],
})
export class BloodRequestsModule {}
