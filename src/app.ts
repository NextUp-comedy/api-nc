import express, { Application } from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import router from './routes';
import { notFound, serverError } from './middleware';
import morganMiddleware from './middleware/morgan';

const app: Application = express();
app.disable('x-powered-by');

app.use([
  express.json({ limit: '3mb' }),
  express.urlencoded({ extended: true }),
  compression(),
  cookieParser(),
  cors(),
]);

app.get('/', (_req, res) => res.json({ message: 'Server Is Running' }));

app.use(morganMiddleware);
app.use('/api/v1', router);
app.use([notFound, serverError]);

export default app;
