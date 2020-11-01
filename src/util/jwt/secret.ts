import { logger } from '../logging/logger';

export const getJwtSecret = (): string => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    logger.error('JWT_SECRET env var is not provided');
    process.exit(1);
  }
  return jwtSecret;
};
