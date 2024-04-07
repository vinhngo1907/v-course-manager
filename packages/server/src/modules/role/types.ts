import { IUser } from "@modules/user/types";

export interface IRole {
	name: string;
	users: IUser[];
}