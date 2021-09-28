import { logger } from '@infra/logger';
import { nanoid } from 'nanoid';

enum ReqResEnum {
  REQUEST = 'REQUEST',
  RESPONSE = 'RESPONSE',
}

// eslint-disable-next-line
export function HttpLog(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: unknown[]) {
    const correlationId = nanoid();
    const calledMethod: string = target?.constructor.name ? `${target.constructor.name}.${propertyKey}` : propertyKey;

    const request = {
      correlationId,
      type: ReqResEnum.REQUEST,
      calledMethod,
      args,
    };
    logger.info(JSON.stringify(request));

    const result = await originalMethod.apply(this, args);

    const response = {
      correlationId,
      type: ReqResEnum.RESPONSE,
      calledMethod,
      result,
    };
    logger.info(JSON.stringify(response));

    return result;
  };

  return descriptor;
}