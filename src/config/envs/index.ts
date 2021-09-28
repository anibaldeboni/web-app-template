import { readFileSync } from 'fs';
const { version, name, description } = JSON.parse(readFileSync(process.cwd() + '/package.json').toString());

// APP
export const APP_NAME = name ?? 'loan-service';
export const APP_VERSION = version;
export const APP_DESCRIPTION = description;
export const APP_ENV = process.env.APP_ENV ?? 'test';
export const APP_IDENTIFIER = process.env.APP_IDENTIFIER ?? 'gaivota-node-service-loan';

// WEB
export const PORT = process.env.PORT ?? 8080;
export const ENVIRONMENT = process.env.NODE_ENV ?? 'development';

// DB
export const DATABASE_URI = process.env.DATABASE_URI ?? 'mongodb://localhost:27017/loandb';
export const CA_DATABASE = process.env.CA_DATABASE ?? '';