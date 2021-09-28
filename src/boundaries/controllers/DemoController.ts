import { DecorateAll, HttpLog } from '@commons/decorators';
import { Demo } from '@domain/Demo';
import { DemoRepository } from '@infra/repositories/DemoRepository';
import { DemoDto } from '@infra/repositories/dto';
import { WebException } from '@infra/web/errors';
import { Body, Get, JsonController, Param, Post } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Inject, Service } from 'typedi';
import { DemoResponse } from './schemas/DemoResponse';

@Service()
@DecorateAll(HttpLog)
@JsonController('/demo')
export class DemoController {
  @Inject()
  private readonly repository!: DemoRepository;

  @Get('/:id')
  @OpenAPI({ summary: 'Get one demo record' })
  @ResponseSchema(DemoResponse)
  @ResponseSchema(WebException, { statusCode: '500, 400, 404' })
  async getById(@Param('id') id: string): Promise<Demo> {
    return this.repository.findById(id);
  }

  @Post()
  @OpenAPI({ summary: 'Create a new demo record' })
  @ResponseSchema(DemoResponse)
  @ResponseSchema(WebException, { statusCode: '500, 400, 404' })
  async createDemo(@Body() demo: DemoDto): Promise<Demo> {
    return this.repository.createDemo(demo);
  }
}

