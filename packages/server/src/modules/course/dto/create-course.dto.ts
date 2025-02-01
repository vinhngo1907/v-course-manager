import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CourseCreationDTO {
    @IsNotEmpty()
    @ApiProperty()
    title: string

    @IsNotEmpty()
    @ApiProperty()
    description: string

    @IsNotEmpty()
    @ApiProperty()
    thumbnailUrl?: string
}