import { Injectable } from '@nestjs/common';
import { IUsersService } from './interfaces/IUsersService';

@Injectable()
export class UsersService implements IUsersService {
  create(): string {
    return 'Method not implemented';
  }
}
