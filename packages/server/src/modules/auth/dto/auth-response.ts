import { ApiProperty } from "@nestjs/swagger";

export class AuthUserDto {
    @ApiProperty({
        example: "clx123abc",
        description: "User identififer"
    })
    id: string;

    @ApiProperty({
        example: 'user@gmail.com',
        description: 'User email',
    })
    email: string;

    @ApiProperty({
        example: 'admin',
        description: 'User role',
    })
    role: string;
}

export class LoginResponseDto {
    @ApiProperty({ type: () => AuthUserDto })
    user: AuthUserDto

    @ApiProperty({
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    })
    accessToken: string;
}

export class RegisterDataDto {
  @ApiProperty({ type: () => AuthUserDto })
  user: AuthUserDto;
}


export class RegisterResponseDto {
  @ApiProperty({ example: true })
  readonly success: boolean;

  @ApiProperty({ example: 'Register completed successfully' })
  readonly message: string;

  @ApiProperty({ type: () => RegisterDataDto })
  readonly data: RegisterDataDto;
}


export class LogoutResponseDto {
    @ApiProperty({ example: true })
    loggedOut: boolean;
}