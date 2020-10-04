import { Request, Response, Router } from 'express';
import { groupSchema } from '../models/group/group-schema';
import { addUsersToGroup, createGroup, deleteGroup, getGroup, getGroups, updateGroup } from '../services/group';
import { bodyValidationMiddleware } from '../util/validation';
import { wrapAsync } from '../util/logging/wrap-async';

export const groupRouter = Router()
  .get('/groups', wrapAsync(async (req: Request, res: Response) => {
    res.json(await getGroups());
  }))
  .post('/groups', [
    bodyValidationMiddleware(groupSchema),
    wrapAsync(async (req: Request, res: Response) => {
      const group = await createGroup(req.body);
      res.status(201).json(group);
    })
  ])
  .get('/groups/:id', wrapAsync(async (req: Request, res: Response) => {
    const group = await getGroup(req.params.id);
    group ? res.json(group) : res.sendStatus(404);
  }))
  .put('/groups/:id',[
    bodyValidationMiddleware(groupSchema),
    wrapAsync(async (req: Request, res: Response) => {
      const updatedGroup = await updateGroup(req.params.id, req.body);
      updatedGroup ? res.json(updatedGroup) : res.sendStatus(404);
    })
  ])
  .delete('/groups/:id', wrapAsync(async (req: Request, res: Response) => {
    const result = await deleteGroup(req.params.id);
    result ? res.sendStatus(200) : res.sendStatus(404);
  }))
  .post('/groups/:id/users/add', wrapAsync(async (req, res) => {
    const result = await addUsersToGroup(req.params.id, req.body.ids);
    result ? res.sendStatus(200) : res.sendStatus(404);
  }));
