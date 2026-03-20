import express from 'express';
import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import authRouter from './routes/auth.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js'

const app = express();

app.use(express.json());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

// MiddleWares
app.use(errorMiddleware);

// Testing
app.get('/', (req, res) => {
    res.send('Welcome to SAPI');
});

app.listen(PORT, async() => {
    console.log(`SAPI is running on http://localhost:${PORT}`);
    await connectToDatabase()
});

export default app;