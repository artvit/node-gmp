import jwt from 'jsonwebtoken';
import { jwtSecret } from './secret';

export const jwtSign = (data: string | Record<string, unknown>): string => jwt.sign(data, jwtSecret, { expiresIn: 120 });
