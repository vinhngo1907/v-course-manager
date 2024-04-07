import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class AccountCreationDTO {
    @ApiProperty({ default: "this is username" })
    @IsString()
    @Type()
    @IsNotEmpty()
    readonly username: string;

    @ApiProperty({ default: "this is password" })
    @IsString()
    @Type()
    @IsNotEmpty()
    readonly password: string;
}