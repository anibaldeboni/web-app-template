import { validate } from 'class-validator';
import { Exception, ExceptionEnum } from './errors';

export abstract class DTO {
  async validateDTO?(): Promise<void> {
    const errors = await validate(this);
    if (errors.length) {
      const invalidProps = errors.map(el => el.property).join(',');
      throw new Exception(ExceptionEnum.INVALID_FORMAT, `Invalid properties: ${invalidProps}`);
    }
  }
}
