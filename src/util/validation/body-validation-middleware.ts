import { RequestHandler } from 'express';
import { Schema } from 'joi';
import { errorResponse } from './error-response';

export const bodyValidationMiddleware = (schema: Schema): RequestHandler => (req, res, next) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false
  });

  if (error?.isJoi) {
    res.status(400).json(errorResponse(error));
  } else {
    next();
  }
};
