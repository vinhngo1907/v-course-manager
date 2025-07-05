import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional  } from "class-validator";

export class CourseCreationDTO {
    @IsOptional()
    // @ApiProperty()
    title: string

    @IsNotEmpty()
    // @ApiProperty()
    description: string

    @IsOptional ()
    // @ApiProperty()
    thumbnailUrl?: string

    @IsNotEmpty()
    authorId: string
}