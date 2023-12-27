import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  BloodRequestDto,
  GetBloodRequestsReponse,
} from './dto/blood-request.dto';
import { BloodRequestsService } from './blood-requests.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('blood request')
@Controller('blood-requests')
export class BloodRequestsController {
  constructor(private readonly bloodRequestsService: BloodRequestsService) {}

  @ApiResponse({
    type: GetBloodRequestsReponse,
    isArray: true,
  })
  @Get()
  getRequests() {
    return this.bloodRequestsService.getBloodRequests();
  }

  @Post()
  bloodRequest(@Body() bloodRequestDto: BloodRequestDto) {
    return this.bloodRequestsService.addBloodRequest(bloodRequestDto);
  }
}
