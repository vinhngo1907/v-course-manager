// import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterPayload {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class LoginPayload {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export enum Role {
  User = 'USER',
  Admin = 'ADMIN',
  Supporter = 'SUPPORTER',
  Mod = 'MOD',
}

export interface TokenPayload {
  username: string;
  userId: string;
}
