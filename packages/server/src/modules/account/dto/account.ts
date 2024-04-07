import { IUser } from "@modules/user/types";

export interface AccountDTO {
    username: string;
    email: string;
    createdAt: string;
    roles: string[];
}

export interface IAccount {
    // Define an interface for the Account entity
    id: string;
    username: string;
    password: string;
    isActivated: boolean;
    user?: IUser; // Optional user association
    createdAt: Date
}