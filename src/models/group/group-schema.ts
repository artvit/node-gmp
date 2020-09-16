import Joi from 'joi';
import { allPermissions } from './permission';

export const groupSchema = Joi.object({
  name: Joi.string().min(3).max(64).required(),
  permissions: Joi.array().items(Joi.string().valid(...allPermissions)).min(1)
});
