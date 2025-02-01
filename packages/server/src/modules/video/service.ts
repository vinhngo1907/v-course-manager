import { DatabaseService } from '@modules/database/service';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { VideoDTO } from './dto/video';

@Injectable()
export class VideoService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly logger: Logger
    ) { }

    async findVideosByCourse(courseId: string): Promise<VideoDTO[]> {
        try {
            const videos = this.databaseService.course.findMany({
                where: {
                    id: courseId
                },
                include: {
                    videos: true
                }
            });

            return videos;
        } catch (error: any) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error);
        }
    }

    async findOne(videoId: string): Promise<VideoDTO> {
        try {
            return await this.databaseService.video.findFirst({
                where: {
                    id: videoId
                }
            });
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error);
        }
    }
}
