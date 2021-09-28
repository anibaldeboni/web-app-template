import { DTO } from '@commons/DTO';
import { IDemoDto } from '@domain/dto/IDemoDto';
import { IsString } from 'class-validator';

export class DemoDto extends DTO implements IDemoDto {
  @IsString()
  createdBy!: string;

  @IsString()
  comment!: string;
}