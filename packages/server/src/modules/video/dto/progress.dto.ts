import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class UpdateProgressDto {
  @ApiProperty({
    example: true,
    description: 'Mark chapter as completed or not',
  })
  @IsBoolean()
  isCompleted: boolean;
}

export class UserVideoProgressResponseDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  videoId: string;

  @ApiProperty()
  isCompleted: boolean;

  @ApiProperty({ nullable: true })
  completedAt?: Date;

  @ApiProperty()
  watchedSeconds: number;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  lastWatched: Date;
}