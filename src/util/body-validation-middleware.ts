import { RequestHandler } from 'express';
import { Schema } from 'joi';

export const bodyValidationMiddleware = (schema: Schema): RequestHandler => (req, res, next) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false
  });

  if (error?.isJoi) {
    res.status(400).json(error);
  } else {
    next();
  }
};
