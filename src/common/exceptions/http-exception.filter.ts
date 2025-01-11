import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { HttpArgumentsHost, Provider } from '@nestjs/common/interfaces';
import { APP_FILTER } from '@nestjs/core';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const context: HttpArgumentsHost = host.switchToHttp();
        const response: Response = context.getResponse<Response>();
        const request: Request = context.getRequest<Request>();
        const status: number = exception.getStatus();
        response.status(status).json({
            path: request.url,
            statusCode: status,
            timesTamp: new Date().toISOString(),
            message: exception.message,
        });
    }
}