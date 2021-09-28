import { ExceptionEnum } from '@commons/errors';
import { ENVIRONMENT } from '@config/envs';
import { logger } from '@infra/logger';
import { Request, Response, NextFunction } from 'express';
import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';
import { Service } from 'typedi';
import { ResponseException, RestException } from '../errors';

@Service()
@Middleware({ type: 'after' })
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
  error(error: RestException, request: Request, response: Response, next: NextFunction): void {
    logger.error(JSON.stringify({ ...error }));

    const statusCode = error?.httpCode || this.getErrorStatusCode(error.name);
    const restError: ResponseException = {
      statusCode,
      message: `${error.name} - ${error.message}`,
      errors: error.errors,
    };

    if (ENVIRONMENT === 'development') restError.stack = error.stack;

    response.status(statusCode).json(restError);

    next();
  }

  private getErrorStatusCode(errorName: string): number {
    switch (errorName) {
      case ExceptionEnum.NOT_FOUND:
        return 404;
      case ExceptionEnum.INVALID_FORMAT:
        return 400;
      default:
        return 500;
    }
  }
}