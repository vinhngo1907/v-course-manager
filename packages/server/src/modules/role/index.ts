import { Global, Logger, Module } from '@nestjs/common';
import { RoleService } from './service';
import { RoleController } from './controller';
import { DatabaseService } from '@modules/database/service';

@Global()
@Module({
  providers: [RoleService, DatabaseService, Logger],
  controllers: [RoleController],
})
export class RoleModule {}
