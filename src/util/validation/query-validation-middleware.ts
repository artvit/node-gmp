import { RequestHandler } from 'express';
import { Schema } from 'joi';
import { errorResponse } from './error-response';

export const queryValidationMiddleware = (param: string, schema: Schema): RequestHandler => {
  return (req, res, next) => {
    const { error } = schema.validate(req.query[param]);
    if (error?.isJoi) {
      res.status(422).json(errorResponse(error));
    } else {
      next();
    }
  };
};
