import { Controller, Get, Param } from '@nestjs/common';
import { VideoService } from './service';
import { VideoDTO } from './dto/video';

@Controller('video')
export class VideoController {
    constructor(
        private readonly videoService: VideoService,
    ) { }

    @Get("/:id")
    async getVideosByCourse(
        @Param("id") id: string
    ): Promise<VideoDTO[]> {
        return await this.videoService.findVideosByCourse(id);
    }

    @Get("/:id")
    async getOne(@Param("id") id: string) {
        return await this.videoService.findOne(id);
    }
}
