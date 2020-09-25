import express from 'express';
import { initDb } from './data-access';
import { userRouter } from './routes';
import { groupRouter } from './routes/groups';

initDb()
  .then(() => console.log('DB connected'))
  .catch(err => {
    console.error('DB initialization error: ', err);
    process.exit(1);
  });

const PORT = process.env.PORT || 8080;
const app = express()
  .use(express.json())
  .use('/api', userRouter, groupRouter)
  .use((req, res) => res.sendStatus(404));

app.listen(PORT);
