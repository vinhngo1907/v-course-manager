// import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjsx/crud/lib/crud";

export class CourseResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    thumbnail: string;

    // @ApiProperty()
    // createdAt: Date;

    // @ApiProperty()
    // updatedAt: Date;
}