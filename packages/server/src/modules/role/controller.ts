import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { RoleService } from './service';

@ApiTags('Roles')
@Controller('roles')
export class RoleController {
    constructor(
        private readonly roleService: RoleService,
        private readonly logger: Logger
    ) { }

    @Post('/')
    async getRoles(@Body() roles: string[]) {
        return this.roleService.getRolesByRolesStrArr(roles);
    }
}
