import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { IRole } from './types';
import { DatabaseService } from '@modules/database/service';
import { In } from 'typeorm';
@Injectable()
export class RoleService {
    private readonly logger: Logger = new Logger(RoleService.name);
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async getRolesByRolesStrArr(roles: String[]): Promise<IRole[]> {
        return await this.databaseService.role.findMany({
            where: {
                name: In(roles)
            }
        })
    }
}
