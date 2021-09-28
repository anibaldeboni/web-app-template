import 'reflect-metadata';
import 'dotenv/config';
import { connectDb } from '@infra/repositories/Database';
import { WebApp } from '@infra/web';

const main = async () => {
  const app = new WebApp();
  
  await connectDb();
  app.listen();
};

main();
