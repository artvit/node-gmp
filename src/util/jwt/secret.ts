import { logger } from '../logging/logger';

if (!process.env.JWT_SECRET) {
  logger.error('JWT_SECRET env var is not provided');
  process.exit(1);
}
export const jwtSecret: string = process.env.JWT_SECRET;
