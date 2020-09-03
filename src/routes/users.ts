import { RequestHandler, Router, Request, Response } from 'express';
import { limitSchema, loginSubstringSchema, userSchema } from '../models/user';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../services';
import { bodyValidationMiddleware, queryValidationMiddleware } from '../util/validation';


export const userRouter = Router()
  .get('/users', [
    queryValidationMiddleware('loginSubstring', loginSubstringSchema),
    queryValidationMiddleware('limit', limitSchema),
    (async (req: Request, res: Response) => {
      const loginSubstring = typeof req.query.loginSubstring === 'string' ? req.query.loginSubstring : undefined;
      const limit = typeof req.query.limit === 'string' ? +req.query.limit : undefined;
      const users = await getUsers(loginSubstring, limit);
      res.json(users);
    } ) as RequestHandler
  ])
  .post('/users', [
    bodyValidationMiddleware(userSchema),
    async (req: Request, res: Response) => {
      const user = await createUser(req.body);
      res.status(201).json(user);
    }
  ])
  .put('/users/:id', [
    bodyValidationMiddleware(userSchema),
    async (req: Request, res: Response) => {
      const updatedUser = await updateUser(req.params['id'], req.body);
      updatedUser ? res.json(updatedUser) : res.sendStatus(404);
    }
  ])
  .get('/users/:id', async (req, res) => {
    const user = await getUser(req.params['id']);
    user ? res.json(user) : res.sendStatus(404);
  })
  .delete('/users/:id', async (req, res) => {
    const result = await deleteUser(req.params['id']);
    result ? res.sendStatus(200) : res.sendStatus(404);
  });
