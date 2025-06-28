import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import expenseRoutes from './routes/expense.routes';
import analyticsRoutes from './routes/analytics.routes';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();

app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));

app.use(cors());
app.use(express.json());
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    message,
    stack: err.stack,
  });
});
app.get('/', (_req: Request, res: Response) => {
  return res.send('Expense Tracker Backend Running');
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/auth', authRoutes);
app.use('/expenses', expenseRoutes);
app.use('/analytics', analyticsRoutes);

export { app };