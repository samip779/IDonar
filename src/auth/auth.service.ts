import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUsersService } from 'src/users/interfaces/IUsersService';
import { CreateUserDto } from './dto/register.dto';
import * as argon2 from 'argon2';
import {
  IAuthService,
  ILoginParam,
  IRegisterParam,
} from './interfaces/IAuthService';
import { JwtService } from '@nestjs/jwt';
import { JWTSECRET } from 'src/environments';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly usersService: IUsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(payload: IRegisterParam): Promise<Object> {
    const { email, password, ...rest } = payload;

    const userWithEmail = await this.usersService.findOneByEmail(email);

    if (userWithEmail)
      throw new BadRequestException({ message: 'user already exists' });

    const user = await this.usersService.create({
      email: email.toLowerCase(),
      password: await argon2.hash(password),
      ...rest,
    });

    return {
      message: 'user registered successfully',
    };
  }

  async login({ email, password }: ILoginParam): Promise<Object> {
    const userWithEmail = await this.usersService.findOneByEmail(email);

    if (!userWithEmail)
      throw new NotFoundException({ message: 'user not found' });

    if (!(await argon2.verify(userWithEmail.password, password)))
      throw new BadRequestException({ message: 'email or password is wrong' });

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
