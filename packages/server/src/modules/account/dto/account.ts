import { IUser } from "@modules/user/types";

export interface AccountDTO {
    username: string;
    email?: string;
    createdAt: string;
    roles: string[];
    // user: IUser;
}

export interface IAccount {
    username: string;
    email?: string;
    user?: IUser; // Optional user association
    createdAt: Date;
}