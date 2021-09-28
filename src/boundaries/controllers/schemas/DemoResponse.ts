import { DemoStatus } from '@domain/Demo';
import { IsDateString, IsEnum, IsString } from 'class-validator';

export class DemoResponse {
  @IsString()
  id!: string;

  @IsString()
  createdBy!: string;

  @IsString()
  comment!: string;

  @IsEnum(DemoStatus)
  status!: DemoStatus;

  @IsDateString()
  createdAt!: Date;

  @IsDateString()
  updatedAt!: Date;
}