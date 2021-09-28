import { APP_DESCRIPTION, APP_NAME, APP_VERSION, ENVIRONMENT, PORT } from '@config/envs';
import { logger } from '@logger';
import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import * as swaggerUi from 'swagger-ui-express';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { getMetadataArgsStorage, useContainer, useExpressServer } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { health } from './health';
import { Container } from 'typedi';
import path from 'path';
  
export class WebApp {
  private app: Express;

  private port = PORT;

  constructor() {
    useContainer(Container);

    const routingControllersOptions = {
      cors: true,
      controllers: [`${path.resolve('src')}/boundaries/controllers/*.[t|j]s`],
      middlewares: [`${__dirname}/middlewares/*.[t|j]s`],
      defaultErrorHandler: false,
    };
    const server = express()
      .use(helmet())
      .use(cors())
      .use(express.json({ limit: '100mb' }))
      .use(express.urlencoded({ limit: '100mb', extended: true }))
      .get('/health', health);
    
    useExpressServer(server, routingControllersOptions);

    // eslint-disable-next-line
    const { defaultMetadataStorage } = require('class-transformer/cjs/storage');

    const spec = routingControllersToSpec(getMetadataArgsStorage(), routingControllersOptions, {
      components: {
        schemas: validationMetadatasToSchemas({
          refPointerPrefix: '#/components/schemas/',
          classTransformerMetadataStorage: defaultMetadataStorage,
        }),
      },
      info: {
        description: APP_DESCRIPTION,
        title: APP_NAME,
        version: APP_VERSION,
      },
      servers: [
        {
          url: '/',
          name: 'Api',
        },
      ],
    });

    server.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
    this.app = server;
  }

  listen(): void {
    this.app.listen(this.port, () => {
      logger.info(`listening on ${this.port} (${ENVIRONMENT})`);
    });
  }
}
