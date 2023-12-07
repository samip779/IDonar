import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import {
  DeepPartial,
  FindOptionsSelect,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findOneBy(
    where: FindOptionsWhere<User>,
    select: FindOptionsSelect<User>,
  ) {
    return await this.usersRepository.findOne({
      where,
      select,
    });
  }

  async create(payload: DeepPartial<User>): Promise<User> {
    const user = this.usersRepository.create(payload);

    await this.usersRepository.save(user);

    return user;
  }
}
