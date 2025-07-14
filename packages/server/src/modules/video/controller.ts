import { BadRequestException, Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { VideoService } from './service';
import { LessonDTO, VideoDTO } from './dto/video';
import { VideoCreationDTO } from './dto/create-video.dto';
import { JwtAuthGuard } from '@modules/auth/guards/jwt';
import RequestWithAccount from '@modules/auth/interfaces/RequestWithAccount';

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

    @UseGuards(JwtAuthGuard)
    @Get("/lesson/:lessonId")
    async getVideoByLesson(
        @Param("lessonId") lessonId: string
    ): Promise<LessonDTO> {
        return await this.videoService.findOneWithVideo(lessonId);
    }

    @Get("/:id")
    async getOne(@Param("id") id: string) {
        return await this.videoService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() createVideoDTO: VideoCreationDTO,
        @Req() req: RequestWithAccount
    ): Promise<VideoCreationDTO> {
        const account = req.user;

        // if (!account || !account.userId) {
        //     throw new BadRequestException('Account not found or not authenticated.');
        // }
        // console.log({ account })
        return await this.videoService.create(createVideoDTO, account.id);
    }
}
