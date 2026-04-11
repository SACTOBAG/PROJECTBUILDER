import { Router } from 'express';

const router = Router();

// GET /api/brews — list brew logs for a user
router.get('/', async (req, res) => {
  // TODO: implement with Supabase query
  res.json({ data: [], message: 'Brew logs endpoint' });
});

// POST /api/brews — create a new brew log
router.post('/', async (req, res) => {
  // TODO: implement
  res.status(201).json({ data: null, message: 'Brew log created' });
});

// GET /api/brews/:id — get a single brew log
router.get('/:id', async (req, res) => {
  // TODO: implement
  res.json({ data: null, message: 'Single brew log' });
});

export default router;
