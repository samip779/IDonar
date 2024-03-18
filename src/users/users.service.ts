import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import {
  DeepPartial,
  FindOptions,
  FindOptionsSelect,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { EmailService } from '../email/email.service';
import { OtpService } from '../otp/otp.service';
import { OTPType } from '../otp/enums';
import {
  ResetPasswordDto,
  VerifyResetPasswordOtpDto,
} from './dto/reset-password.dto';
import * as argon2 from 'argon2';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly emailService: EmailService,
    private readonly otpService: OtpService,
  ) {}

  async findOneBy(
    where: FindOptionsWhere<User>,
    select?: FindOptionsSelect<User>,
  ) {
    const findOptions: {
      where: FindOptionsWhere<User>;
      select?: FindOptionsSelect<User>;
    } = { where };

    if (select) findOptions.select = select;

    return await this.usersRepository.findOne(findOptions);
  }

  async create(payload: DeepPartial<User>): Promise<User> {
    const user = this.usersRepository.create(payload);

    await this.usersRepository.save(user);

    return user;
  }

  async verifyUser(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'isVerified'],
    });

    user.isVerified = true;

    return this.usersRepository.save(user);
  }

  async getPasswordResetOTP(email: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email: email.toLowerCase(),
      },
      select: ['id', 'firstname', 'lastname'],
    });

    if (!user)
      throw new HttpException(
        'User with that email is not registered',
        HttpStatus.BAD_REQUEST,
      );

    const otp = await this.otpService.createOtp(
      user.id,
      OTPType.PASSWORD_RESET,
    );

    this.emailService.otpEmail({
      email: email.toLowerCase(),
      name: user.firstname + ' ' + user.lastname,
      otpCode: otp.code,
      otpType: otp.type,
    });

    return {
      message: 'OTP sent successfully',
    };
  }

  async verifyResetPasswordOtp({ email, code }: VerifyResetPasswordOtpDto) {
    const user = await this.usersRepository.findOne({
      where: {
        email: email.toLowerCase(),
      },
      select: ['id'],
    });

    if (!user)
      throw new HttpException('email not registered', HttpStatus.BAD_REQUEST);

    const isValid = await this.otpService.validateOtp(
      user.id,
      code,
      OTPType.PASSWORD_RESET,
    );

    if (!isValid)
      throw new HttpException('Invalid otp', HttpStatus.BAD_REQUEST);

    return {
      message: 'valid otp',
      isValid: true,
    };
  }

  async resetPassword({ email, password, code }: ResetPasswordDto) {
    const user = await this.usersRepository.findOne({
      where: {
        email: email.toLowerCase(),
      },
      select: ['id', 'password'],
    });

    if (!user)
      throw new HttpException(
        'email is not registered',
        HttpStatus.BAD_REQUEST,
      );

    const isValid = await this.otpService.validateOtp(
      user.id,
      code,
      OTPType.PASSWORD_RESET,
    );

    if (!isValid)
      throw new HttpException('invalid otp', HttpStatus.BAD_REQUEST);

    user.password = await argon2.hash(password);

    await this.usersRepository.save(user);

    return {
      success: true,
      message: 'password changed successfully',
    };
  }

  async changePassword(
    userId: string,
    { oldPassword, newPassword }: ChangePasswordDto,
  ) {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },

      select: ['id', 'password'],
    });

    if (!user)
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);

    if (!(await argon2.verify(user.password, oldPassword)))
      throw new HttpException(
        'old password did not match',
        HttpStatus.BAD_REQUEST,
      );

    await this.usersRepository.save({
      id: user.id,
      password: await argon2.hash(newPassword),
    });

    return {
      sucess: true,
      message: 'password changed successfully',
    };
  }
}
