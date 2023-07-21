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
