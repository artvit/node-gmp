import { config } from 'dotenv';

export type ConfigKeyType = 'PORT' | 'DB_URI' | 'DB_SYNC' | 'JWT_SECRET';

type Config = {
  [key in ConfigKeyType]?: string;
};

export const getConfig = (): Config => {
  const conf = config();
  if (conf.error || !conf.parsed) {
    throw conf.error;
  }
  return conf.parsed;
};