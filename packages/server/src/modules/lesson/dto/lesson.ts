import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class LessonUpdateStatusDto {
  @IsNotEmpty()
  @IsString()
  lessonId: string;

  @IsNotEmpty()
  @IsBoolean()
  published: boolean;

  @IsNotEmpty()
  @IsString()
  accountId: string;
}