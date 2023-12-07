import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import {
  DeepPartial,
  FindOptions,
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
}
