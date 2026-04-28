import { Router } from 'express';
import { supabase } from '../index.js';

const router = Router();

// GET /api/pantry?user_id=<uuid> — list pantry items for a user
router.get('/', async (req, res) => {
  const { user_id } = req.query;
  let query = supabase.from('pantry').select('*, ingredients(name, unit_type)');
  if (user_id) query = query.eq('user_id', user_id);
  const { data, error } = await query;
  if (error) return res.status(400).json({ error: error.message });
  res.json({ data });
});

// POST /api/pantry — add a pantry item
router.post('/', async (req, res) => {
  const { user_id, ingredient_id, quantity_remaining, expiration_date, low_stock_threshold } = req.body;
  if (!user_id || !ingredient_id) {
    return res.status(400).json({ error: 'user_id and ingredient_id are required' });
  }
  const { data, error } = await supabase
    .from('pantry')
    .insert({ user_id, ingredient_id, quantity_remaining, expiration_date: expiration_date || null, low_stock_threshold: low_stock_threshold || 0 })
    .select()
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ data });
});

// PATCH /api/pantry/:id — update a pantry item
router.patch('/:id', async (req, res) => {
  const { quantity_remaining, expiration_date, low_stock_threshold } = req.body;
  const { data, error } = await supabase
    .from('pantry')
    .update({ quantity_remaining, expiration_date, low_stock_threshold })
    .eq('pantry_id', req.params.id)
    .select()
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.json({ data });
});

// DELETE /api/pantry/:id — remove a pantry item
router.delete('/:id', async (req, res) => {
  const { error } = await supabase.from('pantry').delete().eq('pantry_id', req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Pantry item deleted' });
});

export default router;
