import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Logger } from 'winston';

export const logMiddleware = (logger: Logger): RequestHandler => (req: Request, res: Response, next: NextFunction) => {
  logger.info({
    method: req.method,
    url: req.url,
    query: req.query
  });
  next();
};
