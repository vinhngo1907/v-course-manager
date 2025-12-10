import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '@modules/database/service';
import { RoleDTO, RoleUpdateDTO } from './dto/role';
import { RoleNotFoundException } from './exception';

@Injectable()
export class RoleService {
  private readonly logger: Logger = new Logger(RoleService.name);
  constructor(private readonly databaseService: DatabaseService) {}

  async getRolesByRolesStrArr(roles: string[]): Promise<RoleDTO[]> {
    const listRole = await this.databaseService.role.findMany({
      where: {
        name: {
          in: roles,
        },
      },
    });
    return listRole;
  }

  async createRolesByRolesStrArr(roles: string[]) {
    const newRoles = roles.map((role) => ({ name: role }));
    const results = await this.databaseService.role.createMany({
      data: newRoles,
    });
    return results;
  }

  async getRoleById(id: string) {
    return await this.databaseService.role.findUnique({
      where: {
        id: id,
      },
      include: {
        users: true,
      },
    });
  }
  async findRole(id: string) {
    return await this.databaseService.role.findFirst({
      where: { id, isActive: true },
    });
  }

  async updateRole(roleId: string, data: RoleUpdateDTO) {
    const role = await this.findRole(roleId);
    if (!role) throw new RoleNotFoundException(roleId);

    return await this.databaseService.role.update({
      where: {
        id: role.id,
      },
      data: {
        ...data,
      },
    });
  }

  async deleteRoleById(roleId: string) {
    return await this.databaseService.role.update({
      where: {
        id: roleId,
      },
      data: {
        isActive: false,
      },
    });
  }
}
