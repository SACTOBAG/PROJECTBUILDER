import { Router } from 'express';
import { supabase } from '../index.js';

const router = Router();

// GET /api/recipes — list public recipes (or all for a user)
router.get('/', async (req, res) => {
  const { user_id } = req.query;
  let query = supabase.from('recipes').select('*').order('created_at', { ascending: false });
  if (user_id) {
    query = query.or(`viewing_status.eq.public,user_id.eq.${user_id}`);
  } else {
    query = query.eq('viewing_status', 'public');
  }
  const { data, error } = await query;
  if (error) return res.status(400).json({ error: error.message });
  res.json({ data });
});

// GET /api/recipes/:id — single recipe
router.get('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('recipe_id', req.params.id)
    .single();
  if (error) return res.status(404).json({ error: 'Recipe not found' });
  res.json({ data });
});

// POST /api/recipes — create a recipe
router.post('/', async (req, res) => {
  const { user_id, title, instructions, viewing_status } = req.body;
  if (!user_id || !title || !instructions) {
    return res.status(400).json({ error: 'user_id, title, and instructions are required' });
  }
  if (viewing_status && !['public', 'private'].includes(viewing_status)) {
    return res.status(400).json({ error: 'viewing_status must be public or private' });
  }
  const { data, error } = await supabase
    .from('recipes')
    .insert({ user_id, title, instructions, viewing_status: viewing_status || 'private' })
    .select()
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ data });
});

// POST /api/recipes/:id/ratings — star rating (no written reviews)
router.post('/:id/ratings', async (req, res) => {
  const { user_id, stars } = req.body;
  if (!user_id || !stars || stars < 1 || stars > 5) {
    return res.status(400).json({ error: 'user_id and stars (1-5) are required' });
  }
  const { data, error } = await supabase
    .from('recipe_ratings')
    .upsert({ recipe_id: req.params.id, user_id, stars }, { onConflict: 'recipe_id,user_id' })
    .select()
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ data });
});

export default router;
