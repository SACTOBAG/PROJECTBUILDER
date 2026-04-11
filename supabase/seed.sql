-- ============================================================
-- Brew Master — Seed Data
-- ============================================================

-- Brewing Methods
insert into public.brewing_methods (name, description, default_grind, default_water_temp_f, default_brew_time_sec, steps) values
(
  'French Press',
  'A full-immersion brewing method that produces a rich, full-bodied cup.',
  'coarse',
  200,
  240,
  '[
    {"step": 1, "title": "Boil Water", "description": "Heat water to 200°F (93°C)."},
    {"step": 2, "title": "Grind Beans", "description": "Grind beans to a coarse consistency, like sea salt."},
    {"step": 3, "title": "Add Coffee", "description": "Add ground coffee to the French Press (1:15 ratio)."},
    {"step": 4, "title": "Pour Water", "description": "Pour hot water over the grounds, saturating evenly."},
    {"step": 5, "title": "Steep", "description": "Place the lid on and steep for 4 minutes."},
    {"step": 6, "title": "Press & Serve", "description": "Slowly press the plunger down and serve immediately."}
  ]'::jsonb
),
(
  'Pour Over',
  'A manual drip method that highlights clean, nuanced flavors.',
  'medium-fine',
  205,
  210,
  '[
    {"step": 1, "title": "Boil Water", "description": "Heat water to 205°F (96°C)."},
    {"step": 2, "title": "Grind Beans", "description": "Grind beans to a medium-fine consistency, like table salt."},
    {"step": 3, "title": "Rinse Filter", "description": "Place filter in dripper and rinse with hot water. Discard rinse water."},
    {"step": 4, "title": "Bloom", "description": "Add grounds, pour just enough water to saturate, wait 30-45 seconds."},
    {"step": 5, "title": "Pour in Circles", "description": "Pour water in slow, concentric circles in 3-4 stages."},
    {"step": 6, "title": "Serve", "description": "Remove dripper once the draw-down finishes (~3:30 total). Enjoy!"}
  ]'::jsonb
),
(
  'AeroPress',
  'A versatile, pressure-based brewer known for smooth, concentrated coffee.',
  'fine',
  185,
  90,
  '[
    {"step": 1, "title": "Boil Water", "description": "Heat water to 185°F (85°C)."},
    {"step": 2, "title": "Grind Beans", "description": "Grind beans to a fine consistency."},
    {"step": 3, "title": "Assemble", "description": "Place a filter in the cap and attach to the chamber."},
    {"step": 4, "title": "Add Coffee & Water", "description": "Add grounds, pour water, and stir for 10 seconds."},
    {"step": 5, "title": "Steep", "description": "Wait 60 seconds."},
    {"step": 6, "title": "Press", "description": "Press the plunger slowly over 20-30 seconds into your mug."}
  ]'::jsonb
),
(
  'Cold Brew',
  'A long-steep, cold-water method producing smooth, low-acid concentrate.',
  'extra-coarse',
  40,
  43200,
  '[
    {"step": 1, "title": "Grind Beans", "description": "Grind beans extra-coarse."},
    {"step": 2, "title": "Combine", "description": "Add grounds and cold/room-temp water at a 1:8 ratio."},
    {"step": 3, "title": "Steep", "description": "Cover and refrigerate for 12-24 hours."},
    {"step": 4, "title": "Filter", "description": "Strain through a fine-mesh sieve or filter."},
    {"step": 5, "title": "Dilute & Serve", "description": "Dilute concentrate 1:1 with water or milk. Serve over ice."}
  ]'::jsonb
)
on conflict (name) do nothing;
