import Joi from 'joi';

export const userSchema = Joi.object({
  login: Joi.string().alphanum().min(3).max(50).required(),
  password: Joi.string().pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=(.*[0-9].*){2,}).{8,64}$/).required(),
  age: Joi.number().integer().min(4).max(130).required()
});
