import express, { Application } from 'express';
import cors from 'cors';

// routes
import { UserRoutes } from './app/modules/users/user.route';

// middleware
import globalErrorHandler from './app/middleware/globalErrorHandler';

// app
const app: Application = express();

// cors
app.use(cors());

// perser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/users/', UserRoutes);

// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing Error logger')
// })

// Error Handler
app.use(globalErrorHandler);

export default app;
