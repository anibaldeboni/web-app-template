import { Demo } from '@domain/Demo';
import { DemoRepository } from '@infra/repositories/DemoRepository';
import { Inject, Service } from 'typedi';
import { IApplication } from './interfaces';

@Service()
export class DemoApplication implements IApplication<string, Promise<Demo>> {
  @Inject()
  private readonly repository!: DemoRepository;

  handle = (id: string): Promise<Demo> => {
    return this.repository.findById(id);
  };
}