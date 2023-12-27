import { Body, Controller, Post } from '@nestjs/common';
import { BloodRequestDto } from './dto/blood-request.dto';
import { BloodRequestsService } from './blood-requests.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('blood-requests')
export class BloodRequestsController {
  constructor(private readonly bloodRequestsService: BloodRequestsService) {}

  @ApiTags('blood request')
  @Post()
  bloodRequest(@Body() bloodRequestDto: BloodRequestDto) {
    return this.bloodRequestsService.addBloodRequest(bloodRequestDto);
  }
}
