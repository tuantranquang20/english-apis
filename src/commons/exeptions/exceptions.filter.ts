import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';

@Catch(InternalServerErrorFilter)
export class InternalServerErrorFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message || 'Internal Server Error';
    const errors = exception.getResponse() as object;

    const errorResponse = {
      statusCode: status,
      message,
      ...errors,
    };

    response.status(status).json(errorResponse);
  }
}
