import { Router } from 'express';

const router = Router();

// GET /api/pantry — list pantry items for a user
router.get('/', async (req, res) => {
  // TODO: implement with Supabase query
  res.json({ data: [], message: 'Pantry items endpoint' });
});

// POST /api/pantry — add a pantry item
router.post('/', async (req, res) => {
  // TODO: implement
  res.status(201).json({ data: null, message: 'Pantry item added' });
});

// PATCH /api/pantry/:id — update a pantry item
router.patch('/:id', async (req, res) => {
  // TODO: implement
  res.json({ data: null, message: 'Pantry item updated' });
});

// DELETE /api/pantry/:id — remove a pantry item
router.delete('/:id', async (req, res) => {
  // TODO: implement
  res.json({ message: 'Pantry item deleted' });
});

export default router;
