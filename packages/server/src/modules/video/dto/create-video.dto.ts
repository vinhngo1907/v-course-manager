import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";
import { Course } from "@prisma/client";

export class VideoCreationDTO {
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
    readonly thumbnailUrl?: string

    @ApiProperty({ default: 'this is videoUrl' })
    @IsString()
    @Type(() => String)
    @IsNotEmpty()
    readonly videoUrl?: string;

    @ApiProperty({ default: "this is courseId" })
    @IsString()
    @Type(() => String)
    @IsNotEmpty()
    readonly courseId?: string

    course?: Course

    @ApiProperty({ example: 60.5 })
    @IsNumber()
    readonly duration: number;
}