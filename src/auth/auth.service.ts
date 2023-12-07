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

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
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

    this.emailService.welcomeEmail({
      email,
      name: user.firstname,
    });

    return {
      message: 'user registered successfully',
    };
  }

  async login({ email, password }: LoginDto): Promise<Object> {
    const userWithEmail = await this.usersService.findOneBy(
      { email },
      { id: true, password: true, firstname: true, bloodGroup: true },
    );

    if (!userWithEmail)
      throw new NotFoundException({ message: 'user not found' });

    if (!(await argon2.verify(userWithEmail.password, password)))
      throw new BadRequestException({ message: 'email or password is wrong' });

    this.emailService.welcomeEmail({
      email,
      name: userWithEmail.firstname,
    });

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
}
