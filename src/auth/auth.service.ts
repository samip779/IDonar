import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { JWTSECRET } from 'src/environments';
import { EmailService } from 'src/email/email.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/register.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { OtpService } from 'src/otp/otp.service';
import { OTPType } from 'src/otp/enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly otpService: OtpService,
  ) {}

  async register(payload: CreateUserDto): Promise<Object> {
    const { email, password, ...rest } = payload;

    const userWithEmail = await this.usersService.findOneBy(
      { email },
      { id: true },
    );

    if (userWithEmail)
      throw new BadRequestException({ message: 'user already exists' });

    const user = await this.usersService.create({
      email: email.toLowerCase(),
      password: await argon2.hash(password),
      ...rest,
    });

    // this.emailService.welcomeEmail({
    //   email,
    //   name: user.firstname,
    // });

    const otp = await this.otpService.createOtp(
      user.id,
      OTPType.EMAIL_VERIFICATION,
    );

    this.emailService.otpEmail({
      email,
      name: user.firstname,
      otpCode: otp.code,
      otpType: otp.type,
    });

    return {
      message: 'user registered successfully',
    };
  }

  async login({ email, password }: LoginDto): Promise<Object> {
    const userWithEmail = await this.usersService.findOneBy(
      { email },
      {
        id: true,
        password: true,
        firstname: true,
        bloodGroup: true,
        isVerified: true,
      },
    );

    if (!userWithEmail)
      throw new NotFoundException({ message: 'user not found' });

    if (!(await argon2.verify(userWithEmail.password, password)))
      throw new BadRequestException({ message: 'email or password is wrong' });

    if (!userWithEmail.isVerified) {
      const otp = await this.otpService.createOtp(
        userWithEmail.id,
        OTPType.EMAIL_VERIFICATION,
      );

      this.emailService.otpEmail({
        email,
        name: userWithEmail.firstname,
        otpCode: otp.code,
        otpType: otp.type,
      });

      throw new BadRequestException({
        verified: false,
        message: 'email not verified',
      });
    }

    return {
      message: 'user logged in successfully',
      email: userWithEmail.email,
      bloodGroup: userWithEmail.bloodGroup,
      token: await this.jwtService.signAsync(
        { sub: userWithEmail.id },
        { expiresIn: '1d', secret: JWTSECRET },
      ),
    };
  }

  async verifyEmail({ email, code }: VerifyEmailDto) {
    const user = await this.usersService.findOneBy(
      { email },
      { id: true, email: true, isVerified: true, bloodGroup: true },
    );

    if (!user) throw new BadRequestException('Invalid Credentials');
    if (user.isVerified) throw new BadRequestException('user already verified');

    const isValid = await this.otpService.validateOtp(
      user.id,
      code,
      OTPType.EMAIL_VERIFICATION,
    );

    if (!isValid) throw new BadRequestException('Invalid OTP');

    await this.usersService.verifyUser(user.id);

    return {
      message: 'verified successfully',
      email: user.email,
      bloodGroup: user.bloodGroup,
      token: await this.jwtService.signAsync(
        { sub: user.id },
        { expiresIn: '1d', secret: JWTSECRET },
      ),
    };
  }
}
