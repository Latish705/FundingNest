import express, { Request, Response } from 'express';

const router = express.Router();

// GET all startups
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'GET all startups endpoint', startups: [] });
});

// GET startup by ID
router.get('/:id', (req: Request, res: Response) => {
  res.json({ message: `GET startup with ID: ${req.params.id}`, startup: {} });
});

// POST create new startup
router.post('/create', (req: Request, res: Response) => {
  console.log('Received startup data:', req.body);
  res.json({ 
    success: true, 
    message: 'Startup created successfully (mock)',
    startup: req.body
  });
});

export default router;