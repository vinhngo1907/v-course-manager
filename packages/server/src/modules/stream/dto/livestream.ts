
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class StartLiveStreamDto {
    @ApiProperty({
        description: 'Room that will be recorded',
        example: 'course-room-001',
    })
    @IsString()
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