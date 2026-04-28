import { Router } from 'express';
import { supabase } from '../index.js';

const router = Router();

// GET /api/brews?user_id=<uuid> — list brew logs for a user
router.get('/', async (req, res) => {
  const { user_id } = req.query;
  let query = supabase.from('brews').select('*').order('start_date', { ascending: false });
  if (user_id) query = query.eq('user_id', user_id);
  const { data, error } = await query;
  if (error) return res.status(400).json({ error: error.message });
  res.json({ data });
});

// GET /api/brews/:id — get a single brew log
router.get('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('brews')
    .select('*')
    .eq('brew_id', req.params.id)
    .single();
  if (error) return res.status(404).json({ error: 'Brew not found' });
  res.json({ data });
});

// POST /api/brews — create a new brew log
router.post('/', async (req, res) => {
  const { user_id, recipe_id, grind_size, bean_type, water_temp_f, start_date, duration } = req.body;
  if (!user_id || !duration) {
    return res.status(400).json({ error: 'user_id and duration are required' });
  }
  const { data, error } = await supabase
    .from('brews')
    .insert({ user_id, recipe_id: recipe_id || null, grind_size, bean_type, water_temp_f, start_date: start_date || new Date().toISOString(), duration })
    .select()
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ data });
});

export default router;
