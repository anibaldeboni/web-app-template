import winston from 'winston';
import { APP_NAME } from '@config/envs';

export const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  format: winston.format.combine(
    winston.format.label({ label: APP_NAME }),
    winston.format.simple(),
    winston.format.timestamp(),
    winston.format.printf(({ level, message, label, timestamp }) => {
      return `${timestamp} - ${level.toUpperCase()} [${label}]: ${message}`;
    }),
  ),
  transports: [new winston.transports.Console()],
});
