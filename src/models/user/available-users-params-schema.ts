import Joi from 'joi';

export const loginSubstringSchema = Joi.string().optional();

export const limitSchema = Joi.number().optional();
