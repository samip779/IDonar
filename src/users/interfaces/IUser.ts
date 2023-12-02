import { BloodGroup, Gender } from '../enums';

export interface IUser {
  firstname: string;
  lastname: string;
  gender: Gender;
  height: number;
  weight: number;
  email: string;
  password: string;
  city: string;
  province: string;
  street: string;
  phone: string;
  bloodGroup?: BloodGroup;
}
