import { NextFunction, RequestHandler, Request, Response } from 'express';

export const wrapAsync = (fn: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
