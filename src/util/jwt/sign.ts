import jwt from 'jsonwebtoken';
import { getJwtSecret } from './secret';

export const jwtSign =
  (data: string | Record<string, unknown>): string => jwt.sign(data, getJwtSecret(), { expiresIn: 120 });
