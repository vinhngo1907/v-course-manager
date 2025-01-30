import { Controller, Get, Param } from '@nestjs/common';
import { VideoService } from './service';

@Controller('video')
export class VideoController {
    constructor(
        private readonly videoService: VideoService,
    ){}

    @Get("/:id")
    async getVideosByCourse(
        @Param("id") id: string
    ){
        return await this.videoService.findVideosByCourse(id);
    }
}
