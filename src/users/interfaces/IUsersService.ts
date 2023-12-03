import { IUser } from './IUser';

export abstract class IUsersService {
  abstract create(payload: IUser): Promise<IUser>;
  abstract findOneByEmail(email: string): Promise<IUser>;
}
