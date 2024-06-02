import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CourseCreationDTO {
    @IsNotEmpty()
    @ApiProperty()
    title: String

    @IsNotEmpty()
    @ApiProperty()
    description: String

    @IsNotEmpty()
    @ApiProperty()
    thumbnailUrl: String
}