import { Body, Controller, Get, HttpStatus, Injectable, Logger, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { RoleService } from './service';

@Injectable()
@ApiTags('roles')
@Controller('roles')
export class RoleController {
    constructor(
        private readonly roleService: RoleService,
        private readonly logger: Logger
    ) { }

    @Post('/')
    async getRoles(@Body('roles') roles: string[]) {
        try {
            console.log({roles})
            const results = await this.roleService.getRolesByRolesStrArr(roles);
            return {
                statusCode: HttpStatus.OK,
                message: 'success',
                data: results,
            }
        } catch (error) {
            this.logger.error('Error while fetching roles:', error.message);
            throw error; // Ensure errors are propagated correctly

        }
    }
}
