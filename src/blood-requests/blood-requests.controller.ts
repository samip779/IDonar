import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  BloodRequestDto,
  GetBloodRequestsReponse,
} from './dto/blood-request.dto';
import { BloodRequestsService } from './blood-requests.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt.guard';

@ApiTags('blood request')
@Controller('blood-requests')
export class BloodRequestsController {
  constructor(private readonly bloodRequestsService: BloodRequestsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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
