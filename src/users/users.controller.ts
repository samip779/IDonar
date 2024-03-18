import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { GetUser } from '../decorators/get-user.decorator';
import {
  ResetPasswordDto,
  ResetPasswordOTPDto,
  VerifyResetPasswordOtpDto,
} from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getUserDetails(@GetUser('id') id: string) {
    return this.usersService.findOneBy(
      { id },
      {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        bloodGroup: true,
        gender: true,
        weight: true,
        height: true,
        phone: true,
        city: true,
        province: true,
        street: true,
      },
    );
  }

  @Patch('reset-password/otp')
  getPasswordResetOTP(@Body() resetPasswordOtpDto: ResetPasswordOTPDto) {
    return this.usersService.getPasswordResetOTP(resetPasswordOtpDto.email);
  }

  @Patch('reset-password/otp/verify')
  verifyResetPasswordOtp(
    @Body() verifyResetPasswordOtpDto: VerifyResetPasswordOtpDto,
  ) {
    return this.usersService.verifyResetPasswordOtp(verifyResetPasswordOtpDto);
  }

  @Patch('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.usersService.resetPassword(resetPasswordDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @GetUser('id') userId: string,
  ) {
    return this.usersService.changePassword(userId, changePasswordDto);
  }
}
