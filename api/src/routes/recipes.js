import { Router } from 'express';

const router = Router();

// GET /api/recipes — list public + user recipes
router.get('/', async (req, res) => {
  // TODO: implement with Supabase query
  res.json({ data: [], message: 'Recipes endpoint' });
});

// POST /api/recipes — create a recipe
router.post('/', async (req, res) => {
  // TODO: implement
  res.status(201).json({ data: null, message: 'Recipe created' });
});

// GET /api/recipes/:id — single recipe
router.get('/:id', async (req, res) => {
  // TODO: implement
  res.json({ data: null, message: 'Single recipe' });
});

// POST /api/recipes/:id/reviews — add a review
router.post('/:id/reviews', async (req, res) => {
  // TODO: implement
  res.status(201).json({ data: null, message: 'Review added' });
});

export default router;
