import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from '@nestjsx/crud';
import { UsersService } from "./service";

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(public service: UsersService) { }

}