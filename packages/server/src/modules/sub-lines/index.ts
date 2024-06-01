import { Module } from '@nestjs/common';
import { SubLinesController } from './controller';
import { SubLinesService } from './service';

@Module({
  controllers: [SubLinesController],
  providers: [SubLinesService]
})
export class SubLinesModule {}
