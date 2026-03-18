import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class StartRecordDto {
  @ApiProperty({
    description: 'Room that will be recorded',
    example: 'course-room-001',
  })
  @IsString()
  roomName: string;
}

export class StopRecordDto {
  @ApiProperty({
    description: 'ID of the recording session',
    example: 'rec_67a9cabc1f',
  })
  @IsString()
  recordingId: string;
}
