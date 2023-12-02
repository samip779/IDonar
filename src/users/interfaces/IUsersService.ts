import { IUser } from './IUser';

export abstract class IUsersService {
  abstract create(): string;
  // abstract findAll(): Promise<IUser>;
}
