import { IDemo } from '@domain/Demo';

export type IDemoDto = Omit<IDemo, 'id' | 'createdAt' | 'updatedAt'>;