import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppConfigService } from 'src/config/service';
// import { configService } from 'src/config/config.service';

// @Catch()
// export class AllExceptionsFilter implements ExceptionFilter {
//   constructor(private readonly appConfigService: AppConfigService) { }
//   // catch(exception: unknown, host: ArgumentsHost) {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();
//     const request = ctx.getRequest();

//     const status =
//       exception instanceof HttpException
//         ? exception.getStatus()
//         : HttpStatus.INTERNAL_SERVER_ERROR;

//     if (
//       status === HttpStatus.UNAUTHORIZED &&
//       request.originalUrl === '/auth/profile'
//     ) {
//       response.setHeader(
//         'Access-Control-Allow-Origin',
//         this.appConfigService.getClientUrl(),
//         // configService.getClientUrl(),
//       );

//       response.setHeader(
//         'Set-Cookie',
//         `Authentication=; HttpOnly; Path=/; Max-Age=0;SameSite=None; Secure`,
//       );
//       response.status(HttpStatus.OK).send();
//       return;
//     }

//     let message: any =
//       exception instanceof HttpException
//         ? exception?.getResponse()
//         : 'Internal server';
//     message = message instanceof Object ? message.message : message;
//     if (message instanceof Array) {
//       for (let i = 0; i < message.length; i++) {
//         if (message[i].split(' ')[0].includes('.')) {
//           const customMessage = message[i].split(' ');
//           customMessage[0] = customMessage[0].split('.')[2];
//           message[i] = customMessage.join(' ');
//         }
//       }
//     }

//     const exceptionResponse = exception.getResponse();
//     response.status(status).json({
//       status,
//       timestamp: new Date().toUTCString(),
//       path: request.url,
//       message,
//       ...(typeof exceptionResponse === 'string'
//         ? { message: exceptionResponse }
//         : exceptionResponse),
//     });
//   }
// }

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly appConfigService: AppConfigService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (
      status === HttpStatus.UNAUTHORIZED &&
      request.originalUrl === '/auth/profile'
    ) {
      response.setHeader(
        'Access-Control-Allow-Origin',
        this.appConfigService.getClientUrl(),
      );

      response.setHeader(
        'Set-Cookie',
        `Authentication=; HttpOnly; Path=/; Max-Age=0;SameSite=None; Secure`,
      );

      response.status(HttpStatus.OK).send();
      return;
    }

    let message: any = 'Internal server error';
    let exceptionResponse: any = {};

    if (exception instanceof HttpException) {
      exceptionResponse = exception.getResponse();

      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : exceptionResponse.message;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    if (Array.isArray(message)) {
      for (let i = 0; i < message.length; i++) {
        if (message[i].split(' ')[0].includes('.')) {
          const customMessage = message[i].split(' ');
          customMessage[0] = customMessage[0].split('.')[2];
          message[i] = customMessage.join(' ');
        }
      }
    }

    response.status(status).json({
      status,
      timestamp: new Date().toUTCString(),
      path: request.url,
      message,
      ...(typeof exceptionResponse === 'object' ? exceptionResponse : {}),
    });
  }
}
