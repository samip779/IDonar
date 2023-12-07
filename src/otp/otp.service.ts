import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OTP } from './entities/otp.entity';
import { Repository } from 'typeorm';
import { OTPType } from './enums';
import { generateOTP } from 'src/helpers/otp';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(OTP) private readonly otpRepository: Repository<OTP>,
  ) {}

  async createOtp(userId: string, type: OTPType) {
    // Delete previous otp if exists
    await this.otpRepository.delete({ userId });

    const otp = this.otpRepository.create({
      code: generateOTP(6),
      type,
      userId,
    });

    return this.otpRepository.save(otp);
  }
}
