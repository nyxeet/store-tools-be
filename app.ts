import mongoose = require('mongoose');
import express, { Request, Response } from 'express';
import 'dotenv/config';
import userRouter from './routes/user';
import cors from 'cors';
import logger from 'morgan';

declare let process: {
  env: {
    DB_HOST: string;
    PORT: number;
  };
};

interface Error {
  message: string;
}

const { DB_HOST, PORT = 3001 } = process.env;

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/user', userRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err: Error, req: Request, res: Response) => {
  res.status(500).json({ message: err.message });
});

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => console.log(`Server not running. Error message: ${err.message}`));
