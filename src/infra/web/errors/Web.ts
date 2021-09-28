import { Exception } from '@commons/errors';
import { IsOptional, IsPositive, IsString } from 'class-validator';
import { HttpError } from 'routing-controllers';

export interface RestException extends HttpError, Exception { }

export interface ResponseException {
  statusCode: number;
  message: string;
  errors: unknown;
  stack?: string;
}

export class WebException implements ResponseException {
  @IsPositive()
  statusCode!: number;

  @IsString()
  message!: string;

  @IsOptional()
  @IsString()
  errors!: unknown;
}
