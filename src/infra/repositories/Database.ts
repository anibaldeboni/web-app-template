import { CA_DATABASE, DATABASE_URI } from '@config/envs';
import { logger } from '@infra/logger';
import mongoose from 'mongoose';

export async function connectDb(): Promise<void> {
  logger.info('Connecting to Database');

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    sslCA: CA_DATABASE,
  };

  if (CA_DATABASE) await mongoose.connect(DATABASE_URI, options);
  else await mongoose.connect(DATABASE_URI);

  logger.info('Database connected');
}
