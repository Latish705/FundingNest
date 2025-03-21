import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import startupRoutes from './routes/startupRoutes';
import investmentRoutes from './routes/investmentRoutes';

// Initialize environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection - Fix the environment variable name
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/fundingNest')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Basic Route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'FundingNest API is running' });
});

// Routes
app.use('/api/startup', startupRoutes);
app.use('/api/investment', investmentRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});