import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { RoleService } from './service';

@ApiTags('Roles')
@Crud({
    model: {
        type: 'Role'
    }
})
@Controller('roles')
export class RoleController {
    constructor(
        private readonly roleService: RoleService,
        private readonly logger: Logger
    ) { }
}
