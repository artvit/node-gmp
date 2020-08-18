import { RequestHandler } from 'express';
import { UserStorage } from '../storage';

const userStorage = new UserStorage();

export const getUsers: RequestHandler = (req, res) => {
  let result = userStorage.getAll();
  const loginSubstring = typeof req.query.loginSubstring === 'string' ? req.query.loginSubstring : null;
  if (loginSubstring) {
    result = result.filter(user => user.login.includes(loginSubstring));
  }
  const limit = typeof req.query.limit === 'string' ? +req.query.limit : null;
  if (limit) {
    result = result.slice(0, limit);
  }
  res.json(result);
};

export const getUser: RequestHandler = (req, res) => {
  const user = userStorage.get(req.params['id']);
  user ? res.json(user) : res.sendStatus(404);
};

export const createUser: RequestHandler = (req, res) => res.status(201).json(userStorage.create(req.body));

export const updateUser: RequestHandler = (req, res) => {
  const updatedUser = userStorage.update(req.params['id'], req.body);
  updatedUser ? res.json(updatedUser) : res.sendStatus(404);
};

export const deleteUser: RequestHandler = (req, res) => {
  const deletedUser = userStorage.delete(req.params['id']);
  deletedUser ? res.sendStatus(200) : res.sendStatus(404);
};
