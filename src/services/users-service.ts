import { RequestHandler } from 'express';
import { UserModel } from '../data-access';

const userStorage = UserModel;

export const getUsers: RequestHandler = async (req, res) => {
  let result = await userStorage.findAll();
  const loginSubstring = typeof req.query.loginSubstring === 'string' ? req.query.loginSubstring : null;
  if (loginSubstring) {
    result = result.filter(user => user.login.includes(loginSubstring));
  }
  result = result.sort((u1, u2) => u1.login.localeCompare(u2.login));
  const limit = typeof req.query.limit === 'string' ? +req.query.limit : null;
  if (limit) {
    result = result.slice(0, limit);
  }
  res.json(result);
};

export const getUser: RequestHandler = async (req, res) => {
  const user = await userStorage.findByPk(req.params['id']);
  user ? res.json(user) : res.sendStatus(404);
};

export const createUser: RequestHandler = async (req, res) =>
  res.status(201).json(await userStorage.create(req.body));

export const updateUser: RequestHandler = async (req, res) => {
  const updatedUser = await userStorage.update(req.body, { where: { id: req.params['id'] } });
  updatedUser ? res.json(updatedUser) : res.sendStatus(404);
};

export const deleteUser: RequestHandler = async (req, res) => {
  const deletedUser = await userStorage.findByPk(req.params['id']);
  if (!deletedUser) {
    res.sendStatus(404);
    return;
  }
  await deletedUser.update({ isDeleted: true });
  res.sendStatus(200);
};
