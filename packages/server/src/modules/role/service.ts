import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '@modules/database/service';
import { RoleDTO } from './dto/role';

@Injectable()
export class RoleService {
    private readonly logger: Logger = new Logger(RoleService.name);
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async getRolesByRolesStrArr(roles: string[]): Promise<RoleDTO[]> {
        const listRole = await this.databaseService.role.findMany({
            where: {
                name: {
                    in: roles
                }
            }
        });
        return listRole;
    }

    async createRolesByRolesStrArr(roles: string[]) {
        const newRoles = roles.map(role => ({ 'name': role }))
        const results = await this.databaseService.role.createMany({
            data: newRoles
        });
        return results;
    }
}
