import { Router } from 'express';
import { userSchema } from '../models/user';
import { limitSchema, loginSubstringSchema } from '../models/user';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../services';
import { bodyValidationMiddleware } from '../util/body-validation-middleware';
import { queryValidationMiddleware } from '../util/query-validation-middleware';



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
