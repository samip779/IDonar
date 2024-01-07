import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  BloodRequestDto,
  GetBloodRequestsReponse,
} from './dto/blood-request.dto';
import { BloodRequestsService } from './blood-requests.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('blood request')
@Controller('blood-requests')
export class BloodRequestsController {
  constructor(private readonly bloodRequestsService: BloodRequestsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  getRequests() {
    return this.bloodRequestsService.getBloodRequests();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getRequest(@Param('id') requestId: string) {
    return this.bloodRequestsService.getBloodRequest(requestId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  bloodRequest(
    @Body() bloodRequestDto: BloodRequestDto,
    @GetUser() user: User,
  ) {
    return this.bloodRequestsService.addBloodRequest(bloodRequestDto, user);
  }
}
