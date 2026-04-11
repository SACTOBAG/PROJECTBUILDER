import { Router } from 'express';

const router = Router();

/**
 * POST /api/smart-adjust
 * Body: { taste_feedback: string, current_grind: string, current_temp_f: number, current_brew_time_sec: number }
 * Returns: suggested adjustments for the next brew.
 */
router.post('/', async (req, res) => {
  const { taste_feedback, current_grind, current_temp_f, current_brew_time_sec } = req.body;

  // --- Smart Adjust logic (rule-based v1) ---
  const suggestions = {};

  const feedback = (taste_feedback || '').toLowerCase();

  if (feedback.includes('bitter')) {
    suggestions.grind_size = 'Coarsen your grind by one step';
    suggestions.water_temp = 'Lower temperature by 2-3°F';
    suggestions.brew_time = 'Reduce brew time by 15-20 seconds';
  } else if (feedback.includes('sour') || feedback.includes('acidic')) {
    suggestions.grind_size = 'Fine your grind by one step';
    suggestions.water_temp = 'Increase temperature by 2-3°F';
    suggestions.brew_time = 'Extend brew time by 15-20 seconds';
  } else if (feedback.includes('weak') || feedback.includes('watery')) {
    suggestions.grind_size = 'Fine your grind slightly';
    suggestions.ratio = 'Use more coffee (increase dose by 1-2 g)';
    suggestions.brew_time = 'Extend brew time by 10-15 seconds';
  } else if (feedback.includes('strong') || feedback.includes('intense')) {
    suggestions.grind_size = 'Coarsen your grind slightly';
    suggestions.ratio = 'Use less coffee (reduce dose by 1-2 g)';
  } else {
    suggestions.message = 'Your brew sounds well-balanced! Keep the same parameters.';
  }

  res.json({
    feedback_received: taste_feedback,
    suggestions,
  });
});

export default router;
