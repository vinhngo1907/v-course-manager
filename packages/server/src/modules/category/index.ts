import { Module } from '@nestjs/common';
import { CategoryController } from './controller';
import { CategoryService } from './service';
import { DatabaseService } from '@modules/database/service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, DatabaseService]
})
export class CategoryModule {}
