import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Injectable,
  Logger,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { StreamService } from './service';

@Injectable()
@ApiTags('stream')
@Controller('stream')
export class StreamController {
  constructor(
    private readonly roleService: StreamService,
    private readonly logger: Logger,
  ) {}
}
