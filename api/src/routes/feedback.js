import { Router } from 'express';
import { supabase } from '../index.js';

const router = Router();

// GET /api/feedback/:brew_id — get feedback for a brew
router.get('/:brew_id', async (req, res) => {
  const { data, error } = await supabase
    .from('feedback')
    .select('*')
    .eq('brew_id', req.params.brew_id)
    .single();
  if (error) return res.status(404).json({ error: 'Feedback not found for this brew' });
  res.json({ data });
});

// POST /api/feedback — create feedback for a brew (includes smart-adjust logic)
router.post('/', async (req, res) => {
  const { brew_id, rating, taste_notes } = req.body;
  if (!brew_id || !rating || !taste_notes) {
    return res.status(400).json({ error: 'brew_id, rating, and taste_notes are required' });
  }
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'rating must be between 1 and 5' });
  }

  // Smart-adjust suggestion based on taste notes
  const notes = taste_notes.toLowerCase();
  let suggestion = 'Your brew sounds well-balanced — keep the same parameters!';
  if (notes.includes('bitter')) {
    suggestion = 'Coarsen grind by one step, lower temp by 2-3°F, reduce brew time by 15-20s.';
  } else if (notes.includes('sour') || notes.includes('acidic')) {
    suggestion = 'Fine grind by one step, raise temp by 2-3°F, extend brew time by 15-20s.';
  } else if (notes.includes('weak') || notes.includes('watery')) {
    suggestion = 'Fine grind slightly, increase dose by 1-2g, extend brew time by 10-15s.';
  } else if (notes.includes('strong') || notes.includes('intense')) {
    suggestion = 'Coarsen grind slightly, reduce dose by 1-2g.';
  }

  const { data, error } = await supabase
    .from('feedback')
    .insert({ brew_id, rating, taste_notes, suggestion })
    .select()
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ data });
});

export default router;
