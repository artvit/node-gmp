import { Request, Response } from 'express';
import { getUserByLogin } from '../services/user';
import { jwtSign } from '../util/jwt';

export const login = async (req: Request, res: Response): Promise<void> => {
  const user = await getUserByLogin(req.body.login);
  if (user && user.password === req.body.password) {
    const token = jwtSign(user);
    res.send(token);
  }
  res.sendStatus(401);
};
