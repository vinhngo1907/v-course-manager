import { Module } from '@nestjs/common';
import { SubtilesController } from './controller';
import { SubtilesService } from './service';
import { DatabaseService } from '@modules/database/service';

@Module({
  controllers: [SubtilesController],
  providers: [SubtilesService, DatabaseService]
})
export class SubtilesModule { }
