import { Injectable } from '@nestjs/common';
import { IUsersService } from './interfaces/IUsersService';
import { IUser } from './interfaces/IUser';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });
  }

  async create(payload: IUser): Promise<IUser> {
    const user = this.usersRepository.create(payload);

    await this.usersRepository.save(user);

    return user;
  }
}
