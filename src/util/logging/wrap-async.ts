import { NextFunction, RequestHandler, Request, Response } from 'express';

export const wrapAsync = (fn: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (e) {
      next(e);
    }
  };
};
