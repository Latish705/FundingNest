import express, { Request, Response } from 'express';

const router = express.Router();

// GET all investments
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'GET all investments endpoint', investments: [] });
});

// POST create new investment
router.post('/create', (req: Request, res: Response) => {
  console.log('Received investment data:', req.body);
  res.json({ 
    success: true, 
    message: 'Investment created successfully (mock)',
    investment: req.body
  });
});

export default router;