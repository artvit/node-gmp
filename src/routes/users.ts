import { Router } from 'express';
import { limitSchema, loginSubstringSchema, userSchema } from '../models/user';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../services';
import { bodyValidationMiddleware, queryValidationMiddleware } from '../util/validation';


export const userRouter = Router()
  .get('/users', [
    queryValidationMiddleware('loginSubstring', loginSubstringSchema),
    queryValidationMiddleware('limit', limitSchema),
    getUsers
  ])
  .post('/users', [
    bodyValidationMiddleware(userSchema),
    createUser
  ])
  .put('/users/:id', [
    bodyValidationMiddleware(userSchema),
    updateUser
  ])
  .get('/users/:id', getUser)
  .delete('/users/:id', deleteUser);
