import { Global, Module } from '@nestjs/common';
import { RoleService } from './service';
import { RoleController } from './controller';

@Global()
@Module({
	providers: [RoleService],
	controllers: [RoleController]
})
export class RoleModule { }
