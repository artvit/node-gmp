import express from 'express';
import { userRouter } from './routes';

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());

app
  .use('/api', userRouter)
  .use('/api/ping', (req, res) => {
    res.send('pong');
  });

app.listen(PORT);
