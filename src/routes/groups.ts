import { Request, Response, Router } from 'express';
import { groupSchema } from '../models/group/group-schema';
import { createGroup, deleteGroup, getGroup, getGroups, updateGroup } from '../services/groups-service';
import { bodyValidationMiddleware } from '../util/validation';

export const groupRouter = Router()
  .get('/groups', async (req: Request, res: Response) => {
    res.json(await getGroups());
  })
  .post('/groups', [
    bodyValidationMiddleware(groupSchema),
    async (req: Request, res: Response) => {
      const group = await createGroup(req.body);
      res.status(201).json(group);
    }
  ])
  .get('/groups/:id', async (req: Request, res: Response) => {
    const group = await getGroup(req.params.id);
    group ? res.json(group) : res.sendStatus(404);
  })
  .put('/groups/:id',[
    bodyValidationMiddleware(groupSchema),
    async (req: Request, res: Response) => {
      const updatedGroup = await updateGroup(req.params.id, req.body);
      updatedGroup ? res.json(updatedGroup) : res.sendStatus(404);
    }
  ])
  .delete('/groups/:id', async (req: Request, res: Response) => {
    const result = await deleteGroup(req.params.id);
    result ? res.sendStatus(200) : res.sendStatus(404);
  });
