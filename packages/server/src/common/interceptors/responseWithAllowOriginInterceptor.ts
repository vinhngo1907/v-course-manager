import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { Response as ExpressResponse } from 'express';
// import { configService } from 'src/config/config.service';

@Injectable()
export class ResponseAddAccessTokenToHeaderInterceptor
    implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ResponseObj: ExpressResponse = context.switchToHttp().getResponse();
        ResponseObj.setHeader(
            'Access-Control-Allow-Origin',
            // configService.getClientUrl(),
            "http://localhost:3002"
        );
        return next.handle();
    }
}