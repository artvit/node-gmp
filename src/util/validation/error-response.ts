import { ValidationError } from 'joi';

export type ErrorResponse = { errors: { path: string, message: string }[] };

export const errorResponse = (schemaError: ValidationError): ErrorResponse => ({
  errors: schemaError.details.map(error => ({path: error.path.join('.'), message: error.message}))
});
