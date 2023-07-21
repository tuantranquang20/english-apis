import { Role } from '@src/commons/constants';

export interface ICreateAuth {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}
export interface ILoginAuth {
  email: string;
  password: string;
}

export interface IUser {
  email: string;
  username: string;
  id: string;
  _id: string;
  role: Role;
}
