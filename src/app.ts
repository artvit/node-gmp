import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { initDb } from './data-access';
import { groupRouter, login, userRouter } from './routes';
import { authMiddleware } from './util/jwt/auth-middleware';
import { logMiddleware } from './util/logging/log-middleware';
import { logger } from './util/logging/logger';
import { getConfig } from './config';

process
  .on('unhandledRejection', (reason, p) => {
    logger.error({ cause: 'unhandledRejection', error: reason, promise: p });
  })
  .on('uncaughtException', err => {
    logger.error({ cause: 'uncaughtException', error: err});
  });

await initDb()
  .then(() => logger.info('DB connected'))
  .catch(err => {
    logger.error('DB initialization error: ', err);
    process.exit(1);
  });

const PORT = +(getConfig().PORT || 8080);
const app = express()
  .use(express.json())
  .use(cors())
  .use(logMiddleware(logger))
  .post('/login', login)
  .use('/api', authMiddleware, userRouter, groupRouter)
  .use('/error', (() => {
    throw new Error('Error!');
  }))
  .use('/async-error', async () => {
    return new Promise((resolve, reject) => {
      setImmediate(() => {
        reject(new Error('Async Error!'));
      });
    });
  })
  .use((req, res) => res.sendStatus(404))
  .use((error: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error({ message: error.message, error});
    res.status(500).json({ error: error.message });
  });

app.listen(PORT);
logger.info(`App started on port ${PORT}`);
