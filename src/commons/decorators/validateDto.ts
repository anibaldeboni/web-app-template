import { plainToClass } from 'class-transformer';
import { DTO } from '../DTO';

export function ValidateDto<T extends DTO>(dtoClass: new () => T) {
  // eslint-disable-next-line
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: unknown[]) {
      const [arg] = args;
      const dto = plainToClass(dtoClass, arg);
      if (dto.validateDTO) await dto.validateDTO();
      const applied = await originalMethod.apply(this, args);
      return applied;
    };

    return descriptor;
  };
}
