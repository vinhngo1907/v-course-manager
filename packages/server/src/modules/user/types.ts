import { IRole } from '@modules/role/types';

export interface IAdmin {
  id: string;
}

export interface IMod {
  id: string;
}

export interface ISupporter {
  id: string;
}

export interface IUser {
  id: string;
  email: string;
  fullName: string;
  roles?: IRole[];
}
