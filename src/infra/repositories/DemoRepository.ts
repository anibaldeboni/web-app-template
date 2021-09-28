import { ValidateDto } from '@commons/decorators';
import { Exception, ExceptionEnum } from '@commons/errors';
import { Demo, DemoStatus } from '@domain/Demo';
import { IDemoDto } from '@domain/dto/IDemoDto';
import mongoose from 'mongoose';
import { Inject, Service } from 'typedi';
import { DemoDto } from './dto/DemoDto';
import { DemoModel } from './models';

@Service()
export class DemoRepository {
  constructor(@Inject() private readonly repository: DemoModel) {}
  
  async findById(id: string): Promise<Demo> {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Exception(ExceptionEnum.INVALID_FORMAT, `Invalid id: ${id}`);
    const demo = await this.repository.model.findById(id);
    if (!demo) throw new Exception(ExceptionEnum.NOT_FOUND, `Could not found ${id}`);

    return demo.toObject();
  }

  @ValidateDto(DemoDto)
  async createDemo(demoDto: IDemoDto): Promise<Demo> {
    const demo = { ...demoDto, status: DemoStatus.OPEN };
    console.log(demo);
    return (await this.repository.model.create(demo)).toObject();
  }
}