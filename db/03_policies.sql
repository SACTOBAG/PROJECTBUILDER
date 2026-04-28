-- ============================================================
-- Brew Master — 03_policies.sql
-- Row Level Security policies
-- ============================================================

-- Enable RLS on all tables
alter table public.users enable row level security;
alter table public.recipes enable row level security;
alter table public.brews enable row level security;
alter table public.ingredients enable row level security;
alter table public.pantry enable row level security;
alter table public.feedback enable row level security;
alter table public.recipe_ratings enable row level security;
alter table public.saved_recipes enable row level security;

-- Users: anyone can read, only owner can update
drop policy if exists "Users are viewable by everyone" on public.users;
create policy "Users are viewable by everyone" on public.users for select using (true);
drop policy if exists "Users can update own record" on public.users;
create policy "Users can update own record" on public.users for update using (auth.uid() = user_id);

-- Recipes: public recipes readable by all, owner can CRUD own
drop policy if exists "Public recipes are viewable" on public.recipes;
create policy "Public recipes are viewable" on public.recipes
  for select using (viewing_status = 'public' or auth.uid() = user_id);
drop policy if exists "Users can manage own recipes" on public.recipes;
create policy "Users can manage own recipes" on public.recipes
  for all using (auth.uid() = user_id);

-- Brews: private to owner
drop policy if exists "Users can manage own brews" on public.brews;
create policy "Users can manage own brews" on public.brews
  for all using (auth.uid() = user_id);

-- Ingredients: readable by all (shared catalog)
drop policy if exists "Ingredients are viewable" on public.ingredients;
create policy "Ingredients are viewable" on public.ingredients
  for select using (true);

-- Pantry: private to owner
drop policy if exists "Users can manage own pantry" on public.pantry;
create policy "Users can manage own pantry" on public.pantry
  for all using (auth.uid() = user_id);

-- Feedback: owner of the brew can manage
drop policy if exists "Users can manage own feedback" on public.feedback;
create policy "Users can manage own feedback" on public.feedback
  for all using (
    auth.uid() = (select user_id from public.brews where brew_id = feedback.brew_id)
  );

-- Recipe Ratings: readable by all, users manage own
drop policy if exists "Ratings are viewable" on public.recipe_ratings;
create policy "Ratings are viewable" on public.recipe_ratings for select using (true);
drop policy if exists "Users can manage own ratings" on public.recipe_ratings;
create policy "Users can manage own ratings" on public.recipe_ratings
  for all using (auth.uid() = user_id);

-- Saved Recipes: private to owner
drop policy if exists "Users can manage own saved recipes" on public.saved_recipes;
create policy "Users can manage own saved recipes" on public.saved_recipes
  for all using (auth.uid() = user_id);
