import { Router } from 'express';
import { supabase } from '../index.js';

const router = Router();

// GET /api/ingredients — list all ingredients
router.get('/', async (_req, res) => {
  const { data, error } = await supabase
    .from('ingredients')
    .select('*')
    .order('name');
  if (error) return res.status(400).json({ error: error.message });
  res.json({ data });
});

export default router;
