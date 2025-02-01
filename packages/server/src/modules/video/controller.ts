import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VideoService } from './service';
import { VideoDTO } from './dto/video';
import { VideoCreationDTO } from './dto/create-video.dto';

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

    @Post()
    async create(@Body() createVideoDTO: VideoCreationDTO): Promise<VideoCreationDTO> {
        return await this.videoService.create(createVideoDTO);
    }
}
