import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { Type } from "class-transformer";
import { IsString, IsNotEmpty } from "class-validator";
import { Course } from "@prisma/client";

export class VideoCreateDto {
    @ApiProperty({ default: 'this is title' })
    @IsString()
    @Type(() => String)
    @IsNotEmpty()
    readonly title: string

    @ApiProperty({ default: 'this is description' })
    @IsString()
    @Type(() => String)
    @IsNotEmpty()
    readonly description: string

    @ApiProperty({ default: 'this is thumbnail' })
    @IsString()
    @Type(() => String)
    @IsNotEmpty()
    readonly thumbnail?: string

    @ApiProperty({ default: "this is courseId" })
    @IsString()
    @Type(() => String)
    readonly courseId?: String

    @ApiProperty({ default: 'this is videoUrl' })
    @IsString()
    @Type(() => String)
    @IsNotEmpty()
    readonly videoUrl?: string;

    readonly course?: Course
}