import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  BloodRequestDto,
  GetBloodRequestsQueryDto,
  UpdateBloodRequestDto,
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
  @Get('donations/me')
  getUsersDonations(@GetUser('id') id: string) {
    return this.bloodRequestsService.getUsersDonations(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('donations/:donationId')
  deleteDonationRequest(
    @GetUser('id') userId: string,
    @Param('donationId') donationId: string,
  ) {
    return this.bloodRequestsService.deleteDonationRequest(donationId, userId);
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
  @Delete('me/:blood_request_id')
  deleteUsersBloodRequest(
    @GetUser('id') id: string,
    @Param('blood_request_id', ParseUUIDPipe) bloodRequestId: string,
  ) {
    return this.bloodRequestsService.deleteUsersRequest(bloodRequestId, id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getRequest(@Param('id') requestId: string) {
    return this.bloodRequestsService.getBloodRequest(requestId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateBloodRequest(
    @Param('id') requestId: string,
    @Body() updateBloodRequestDto: UpdateBloodRequestDto,
    @GetUser('id') userId: string,
  ) {
    return this.bloodRequestsService.updateBloodRequests(
      userId,
      requestId,
      updateBloodRequestDto,
    );
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
