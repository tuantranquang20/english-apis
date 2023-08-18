import { UserHistoryType } from './user-history.constant';

export interface ICreateUserHistory {
  userId: string;
  type: UserHistoryType;
  value: string;
}
