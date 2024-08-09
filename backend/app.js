// backend/app.js
import express from 'express';
import userRoutes from './routes/userRoutes';
import eventRoutes from './routes/eventRoutes';
import notificationRoutes from './routes/notificationRoutes';
import historyRoutes from './routes/historyRoutes';
import matchingRoutes from './routes/matchingRoutes';

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/matching', matchingRoutes);

export default app;
