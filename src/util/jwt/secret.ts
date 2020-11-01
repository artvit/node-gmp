import { logger } from '../logging/logger';
import { getConfig } from '../../config';

export const getJwtSecret = (): string => {
  const jwtSecret = getConfig().JWT_SECRET;
  if (!jwtSecret) {
    logger.error('JWT_SECRET env var is not provided');
    process.exit(1);
  }
  return jwtSecret;
};
