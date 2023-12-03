import { IUser } from 'src/users/interfaces/IUser';

export interface ILoginParam {
  email: string;
  password: string;
}

export interface IRegisterParam extends IUser {}

export abstract class IAuthService {
  abstract register(payload: IUser): Promise<Object>;

  abstract login(payload: ILoginParam): Promise<Object>;
}
