import { Body, Controller, Get, HttpStatus, Injectable, Logger, Post, Delete, Put, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { RoleService } from './service';
import { RoleUpdateDTO } from './dto/role';

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
            // console.log({roles})
            const results = await this.roleService.getRolesByRolesStrArr(roles);
            // console.log({results})
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
    @Get('/')
    async getRoleById(@Param('id') id: string) {
        try {
            const result = await this.roleService.getRoleById(id);
            return {
                statusCode: HttpStatus.OK,
                message: 'success',
                data: result,
            }
        } catch (error) {
            this.logger.error('Error while fetching roles:', error.message);
            throw error; // Ensure errors are propagated correctly
        }
    }
    @Post("/create")
    async createRoles(@Body('roles') roles: string[]) {
        try {
            return await this.roleService.createRolesByRolesStrArr(roles);
        } catch (error) {
            this.logger.error('Error while creating roles:', error.message);
            throw error; // Ensure errors are propagated correctly
        }
    }

    @Delete('/:id')
    async remove(@Param('id') id: string) {
        try {
            return await this.roleService.deleteRoleById(id);
        } catch (error) {
            this.logger.error('Error while deleteing roles:', error.message);
            throw error;
        }
    }

    @Put('/:id')
    async updateRole(@Param('id') id: string, @Body() roleData: RoleUpdateDTO) {
        try {
            return await this.roleService.updateRole(id, roleData);
        } catch (error) {
            this.logger.error('Error while update role:', error.message);
            throw error;
        }
    }
}
