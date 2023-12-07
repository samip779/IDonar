import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async welcomeEmail({ email, name }: { email: string; name: string }) {
    const subject = `Welcome to IDonar : ${name}`;

    const response = await this.mailerService.sendMail({
      to: email,
      subject,
      template: './welcome',
      context: {
        name,
      },

      // html: '<h1>Test</h1>',
    });

    console.log(response);
  }
}
