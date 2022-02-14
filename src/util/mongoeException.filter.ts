// eslint-disable-next-line prettier/prettier
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    console.error(req.method, req.url, ' - ', exception.errmsg);

    switch (exception.code) {
      case 11000: {
        res.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          error: 'Conflict',
          keyValue: exception.hasOwnProperty('keyValue')
            ? exception['keyValue']
            : exception,
        });
        break;
      }
      default: {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(exception);
      }
    }
  }
}
