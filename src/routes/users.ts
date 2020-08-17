import { Router } from 'express';
import { UserStorage } from '../storage';

const userStorage = new UserStorage();
export const userRouter = Router()
  .get('/users', (req, res) => res.json(userStorage.getAll()))
  .post('/users', (req, res) => res.json(userStorage.create(req.body)))
  .put('/users/:id', (req, res) => res.json(userStorage.update(req.params['id'], req.body)))
  .get('/users/:id', (req, res) => {
    const user = userStorage.get(req.params['id']);
    user ? res.json(user) : res.status(404).sendStatus(404);
  })
  .delete('/users/:id', (req, res) => res.json(userStorage.delete(req.params['id'])));
