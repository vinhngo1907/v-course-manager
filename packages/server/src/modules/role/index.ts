import { Module } from '@nestjs/common';
import { RoleService } from './service';
import { RoleController } from './controller';

@Module({
	providers: [RoleService],
	controllers: [RoleController]
})
export class RoleModule { }
