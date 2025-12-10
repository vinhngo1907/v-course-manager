import { IUser } from '@modules/user/types';

export interface AccountDTO {
  username: string;
  email: string;
  createdAt: string;
  roles: string[];
}

export interface IAccount {
  username: string;
  email?: string;
  // user?: IUser; // Optional user association
  user?: {
    email: string; // Update the nested user type to match the expected structure,
    roles?: { name: string }[]; // Make roles array non-nullable
  }; // Optional user association
  createdAt: Date;
}
