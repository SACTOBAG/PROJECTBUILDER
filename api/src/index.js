import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

import brewRoutes from './routes/brews.js';
import pantryRoutes from './routes/pantry.js';
import recipeRoutes from './routes/recipes.js';
import feedbackRoutes from './routes/feedback.js';
import ingredientRoutes from './routes/ingredients.js';

export const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase client (service role for server-side operations)
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Routes
app.use('/api/brews', brewRoutes);
app.use('/api/pantry', pantryRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/ingredients', ingredientRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Centralized error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Only start listening when running standalone (not in Lambda)
if (!process.env.LAMBDA_TASK_ROOT) {
  app.listen(PORT, () => {
    console.log(`Brew Master API running on http://localhost:${PORT}`);
  });
}
