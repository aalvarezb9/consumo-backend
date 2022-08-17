import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(
    exception: TypeORMError | HttpException | QueryFailedError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status: number;
    let message: string;
    let error: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse()['message'];
      error = exception.getResponse()['error'];
    } else if (exception instanceof QueryFailedError) {
      message = exception.message;
      error = exception.name;
      if (exception['code'] === '23505') {
        status = 409;
      } else {
        status = 500;
      }
    } else if (exception instanceof TypeORMError) {
      message = exception.message;
      error = exception.name;
      if (exception instanceof EntityNotFoundError) {
        status = 404;
      } else {
        status = 500;
      }
    } else {
      status = 500;
      message = exception['message'];
      error = 'Unknown';
    }

    response.status(status).json({
      status,
      message,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
