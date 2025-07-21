// src/common/filters/all-exceptions.filter.ts
import {
  ExceptionFilter, Catch, ArgumentsHost,
  HttpException, HttpStatus, Logger
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx      = host.switchToHttp();
    const response = ctx.getResponse();
    const request  = ctx.getRequest();

    // 1) Log completo en consola
    this.logger.error(
      `🔴 ${request.method} ${request.url}`,
      exception.stack || exception,
    );

    // 2) Determina el status code
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    // 3) Construye el cuerpo de respuesta
    const errorRes = exception instanceof HttpException
      ? exception.getResponse()
      : { message: 'Internal server error' };

    response.status(status).json({
      statusCode: status,
      timestamp:  new Date().toISOString(),
      path:       request.url,
      ...(typeof errorRes === 'string'
        ? { message: errorRes }
        : errorRes),
    });
  }
}