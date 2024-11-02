import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";

export interface RoleDTO {
    name: string;
}

export class RoleUpdateDTO {
    @IsNotEmpty()
    name?: string;

    @ValidateNested()
    usersId?: { id: string }[];
}