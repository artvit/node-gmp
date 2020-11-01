import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from './secret';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, getJwtSecret(), err =>
      err ? res.status(403).json({ message: 'Wrong token' }) : next()
    );
  } else {
    res.status(401).json({ message: 'Authorization token is not provided' });
  }
};
