import { RequestHandler } from 'express';
import { Schema } from 'joi';

export const queryValidationMiddleware = (param: string, schema: Schema): RequestHandler => {
  return (req, res, next) => {
    const { error } = schema.validate(req.query[param]);
    if (!error) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      res.status(422).json({ error: message });
    }
  };
};
