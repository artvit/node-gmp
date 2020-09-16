import express from 'express';
import { initDb } from './data-access';
import { userRouter } from './routes';
import { groupRouter } from './routes/groups';

initDb()
  .then(() => console.log('DB connected'))
  .catch(err => console.error('DB initialization error: ', err));

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());

app
  .use('/api', userRouter, groupRouter)
  .use('/api/ping', (req, res) => {
    res.send('pong');
  });

app.listen(PORT);
