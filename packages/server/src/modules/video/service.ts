import { DatabaseService } from '@modules/database/service';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

@Injectable()
export class VideoService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly logger: Logger
    ) { }

    async findVideosByCourse(courseId: string) {
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
}
