import { BloodGroup } from '../enums';

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  city: string;
  province: string;
  bloodGroup?: BloodGroup;
}
