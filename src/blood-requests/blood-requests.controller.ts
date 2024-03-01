import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  BloodRequestDto,
  GetBloodRequestsQueryDto,
} from './dto/blood-request.dto';
import { BloodRequestsService } from './blood-requests.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { AcceptBloodRequestDto } from './dto/accept-blood-request.dto';

@ApiTags('blood request')
@Controller('blood-requests')
export class BloodRequestsController {
  constructor(private readonly bloodRequestsService: BloodRequestsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  getRequests(
    @Query() q: GetBloodRequestsQueryDto,
    @GetUser('id') userId: string,
  ) {
    return this.bloodRequestsService.getBloodRequests(userId, {
      latitide: q.lat,
      longitude: q.lon,
    });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getUsersBloodRequests(@GetUser('id') id: string) {
    return this.bloodRequestsService.getUsersBloodRequests(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me/:blood_request_id')
  getUsersBloodRequest(
    @GetUser('id') id: string,
    @Param('blood_request_id', ParseUUIDPipe) bloodRequestId: string,
    // @Query('lat', ParseIntPipe) lat: number,
    // @Query('lon', ParseIntPipe) lon: number,
    @Query() q: GetBloodRequestsQueryDto,
  ) {
    return this.bloodRequestsService.getUserBloodRequest(id, bloodRequestId, {
      latitide: q.lat,
      longitude: q.lon,
    });
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('accept')
  acceptBloodRequest(
    @Body() acceptBloodRequestDto: AcceptBloodRequestDto,
    @GetUser() user: User,
  ) {
    return this.bloodRequestsService.acceptBloodRequest(
      acceptBloodRequestDto,
      user,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('donation-request/accept/:id')
  acceptDonationRequest(@Param('id') id: string, @GetUser() user: User) {
    return this.bloodRequestsService.acceptBloodDonationRequest(id, user.id);
  }
}
