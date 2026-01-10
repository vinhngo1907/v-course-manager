import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTokenDto {
  @ApiProperty({
    description: 'Name of the LiveKit room',
    example: 'course-room-001',
  })
  @IsString()
  @IsNotEmpty()
  roomName: string;

  @ApiProperty({
    description: 'User ID that will receive the token',
    example: 'user_123',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Host or not'
  })
  @IsBoolean()
  isHost?: boolean
}
