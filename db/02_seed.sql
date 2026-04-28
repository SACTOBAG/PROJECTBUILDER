-- ============================================================
-- Brew Master — 02_seed.sql
-- Realistic seed data (3-5 rows per table) honoring relationships
-- ============================================================

-- ---------- Users (5 rows) ----------
insert into public.users (user_id, name, email, password) values
  ('a1000000-0000-0000-0000-000000000001', 'Leanne White',  'leanne@example.com',  'hashed_pw_1'),
  ('a1000000-0000-0000-0000-000000000002', 'Anna Pittman',  'anna@example.com',    'hashed_pw_2'),
  ('a1000000-0000-0000-0000-000000000003', 'Mark Torres',   'mark@example.com',    'hashed_pw_3'),
  ('a1000000-0000-0000-0000-000000000004', 'Emily Chen',    'emily@example.com',   'hashed_pw_4'),
  ('a1000000-0000-0000-0000-000000000005', 'Demo User',     'demo@example.com',    'hashed_pw_5')
on conflict (email) do nothing;

-- ---------- Recipes (5 rows) ----------
insert into public.recipes (recipe_id, user_id, title, instructions, viewing_status) values
  ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001',
   'Classic French Press',
   '1. Boil water to 200°F. 2. Grind beans coarse. 3. Add 30g coffee to press. 4. Pour 450ml water. 5. Steep 4 min. 6. Press and serve.',
   'public'),
  ('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000002',
   'Iced Vanilla Latte',
   '1. Pull 2 shots espresso. 2. Add 1 tbsp vanilla syrup. 3. Fill glass with ice. 4. Pour 8oz milk. 5. Add espresso on top. 6. Stir and enjoy.',
   'public'),
  ('b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000003',
   'Pour Over V60',
   '1. Heat water to 205°F. 2. Grind medium-fine. 3. Rinse filter. 4. Add 20g coffee. 5. Bloom 40s with 40ml. 6. Pour in circles to 320ml over 3 min.',
   'public'),
  ('b1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000004',
   'Quick AeroPress',
   '1. Heat water to 185°F. 2. Grind fine. 3. Add 17g coffee. 4. Pour 220ml water. 5. Stir 10s, steep 60s. 6. Press 30s into mug.',
   'public'),
  ('b1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000005',
   'My Morning Cold Brew',
   '1. Grind extra-coarse. 2. Mix 100g coffee with 800ml cold water. 3. Refrigerate 18 hours. 4. Strain. 5. Dilute 1:1 with water or milk.',
   'private')
on conflict (recipe_id) do nothing;

-- ---------- Brews (5 rows) ----------
insert into public.brews (brew_id, user_id, recipe_id, grind_size, bean_type, water_temp_f, start_date, duration) values
  ('c1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001',
   'b1000000-0000-0000-0000-000000000001', 'coarse', 'Colombian Supremo', 200,
   '2026-04-20 07:15:00+00', 240),
  ('c1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000002',
   'b1000000-0000-0000-0000-000000000002', 'fine', 'Ethiopian Yirgacheffe', 200,
   '2026-04-21 08:30:00+00', 30),
  ('c1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000003',
   'b1000000-0000-0000-0000-000000000003', 'medium-fine', 'Guatemalan Antigua', 205,
   '2026-04-22 09:00:00+00', 210),
  ('c1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000004',
   'b1000000-0000-0000-0000-000000000004', 'fine', 'Brazilian Santos', 185,
   '2026-04-23 06:45:00+00', 90),
  ('c1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000001',
   'b1000000-0000-0000-0000-000000000001', 'coarse', 'Colombian Supremo', 198,
   '2026-04-24 07:20:00+00', 250)
on conflict (brew_id) do nothing;

-- ---------- Ingredients (5 rows) ----------
insert into public.ingredients (ingredient_id, name, unit_type) values
  ('d1000000-0000-0000-0000-000000000001', 'Colombian Supremo Beans', 'g'),
  ('d1000000-0000-0000-0000-000000000002', 'Ethiopian Yirgacheffe Beans', 'g'),
  ('d1000000-0000-0000-0000-000000000003', 'Whole Milk', 'ml'),
  ('d1000000-0000-0000-0000-000000000004', 'Vanilla Syrup', 'ml'),
  ('d1000000-0000-0000-0000-000000000005', 'Oat Milk', 'ml')
on conflict (ingredient_id) do nothing;

-- ---------- Pantry (5 rows — items in Leanne's and Anna's pantries) ----------
insert into public.pantry (pantry_id, user_id, ingredient_id, quantity_remaining, expiration_date, low_stock_threshold) values
  ('e1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001',
   'd1000000-0000-0000-0000-000000000001', '250', '2026-06-15', 50),
  ('e1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001',
   'd1000000-0000-0000-0000-000000000003', '500', '2026-05-01', 100),
  ('e1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000001',
   'd1000000-0000-0000-0000-000000000004', '200', '2026-09-01', 30),
  ('e1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000002',
   'd1000000-0000-0000-0000-000000000002', '100', '2026-05-10', 50),
  ('e1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000002',
   'd1000000-0000-0000-0000-000000000005', '400', '2026-05-05', 100)
on conflict (pantry_id) do nothing;

-- ---------- Feedback (5 rows — one per brew, 1:1) ----------
insert into public.feedback (feedback_id, brew_id, rating, taste_notes, suggestion) values
  ('f1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001',
   4.0, 'Rich and full-bodied, slightly bitter finish.',
   'Try coarsening grind by one step and reducing steep to 3:45.'),
  ('f1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000002',
   5.0, 'Smooth, sweet, perfect balance with the vanilla.',
   'No changes needed — great brew!'),
  ('f1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000003',
   3.5, 'A bit sour and under-extracted.',
   'Grind finer by one step and increase water temp to 208°F.'),
  ('f1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000004',
   4.5, 'Clean and bright, nice acidity.',
   'Well-balanced. Consider 5 more seconds steep for more body.'),
  ('f1000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000005',
   3.0, 'Weaker than usual, watery.',
   'Increase dose by 2g or grind slightly finer.')
on conflict (brew_id) do nothing;

-- ---------- Recipe Ratings (4 rows) ----------
insert into public.recipe_ratings (recipe_id, user_id, stars) values
  ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000002', 4),
  ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000003', 5),
  ('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001', 5),
  ('b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000004', 4)
on conflict (recipe_id, user_id) do nothing;

-- ---------- Saved Recipes (3 rows) ----------
insert into public.saved_recipes (user_id, recipe_id) values
  ('a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001'),
  ('a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000002'),
  ('a1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000003')
on conflict (user_id, recipe_id) do nothing;
