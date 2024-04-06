import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from '@nestjsx/crud';
import { UsersService } from "./service";

@ApiTags('Users')
@Crud({
    // model: {
    //     type: User,
    // },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    },
    query: {
        join: {
            account: {
                allow: ['username'],
            },
            roles: {
                allow: ['name'],
            },
        },
    },
})
@Controller('users')
export class UsersController implements CrudController {
    constructor(public service: UsersService) { }

}