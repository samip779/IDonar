import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OTPType } from 'src/otp/enums';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async welcomeEmail({ email, name }: { email: string; name: string }) {
    const subject = `Welcome to IDonar : ${name}`;

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './welcome',
      context: {
        name,
      },
    });
  }

  async otpEmail(details: {
    email: string;
    name: string;
    otpCode: string;
    otpType: OTPType;
  }) {
    const subject =
      details.otpType === OTPType.EMAIL_VERIFICATION
        ? 'Email Verifiction OTP'
        : 'Password Reset OTP';

    await this.mailerService.sendMail({
      to: details.email,
      subject,
      template: './email-verification',
      context: {
        code: details.otpCode,
        name: details.name,
        expirationTimeInMinutes: '10',
      },
    });
  }
}
