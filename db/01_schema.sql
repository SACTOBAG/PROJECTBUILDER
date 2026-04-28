-- ============================================================
-- Brew Master — 01_schema.sql
-- Tables, PKs/FKs, constraints matching the Analyst's schema
-- ============================================================

-- Drop old tables (from previous migration) so we start clean
drop table if exists public.saved_recipes cascade;
drop table if exists public.recipe_ratings cascade;
drop table if exists public.feedback cascade;
drop table if exists public.pantry cascade;
drop table if exists public.ingredients cascade;
drop table if exists public.brews cascade;
drop table if exists public.recipes cascade;
drop table if exists public.users cascade;
-- Also drop legacy tables from the old 001_initial_schema.sql
drop table if exists public.favorites cascade;
drop table if exists public.planner_entries cascade;
drop table if exists public.reviews cascade;
drop table if exists public.pantry_items cascade;
drop table if exists public.brew_logs cascade;
drop table if exists public.brewing_methods cascade;
drop table if exists public.profiles cascade;

-- ---------- Users ----------
create table if not exists public.users (
  user_id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  password text not null,
  created_at timestamptz default now()
);

-- ---------- Recipes ----------
create table if not exists public.recipes (
  recipe_id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(user_id) on delete set null,
  title text not null,
  instructions text not null,
  viewing_status text not null default 'private'
    check (viewing_status in ('public','private')),
  created_at timestamptz default now()
);

-- ---------- Brews ----------
create table if not exists public.brews (
  brew_id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(user_id) on delete cascade,
  recipe_id uuid references public.recipes(recipe_id) on delete set null,
  grind_size text,
  bean_type text,
  water_temp_f integer,
  start_date timestamptz not null default now(),
  duration integer not null,
  created_at timestamptz default now()
);

-- ---------- Ingredients ----------
create table if not exists public.ingredients (
  ingredient_id uuid primary key default gen_random_uuid(),
  name text not null,
  unit_type text not null,
  created_at timestamptz default now()
);

-- ---------- Pantry ----------
-- User 1:1 Pantry conceptually; each row is an item in the user's pantry
create table if not exists public.pantry (
  pantry_id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(user_id) on delete cascade,
  ingredient_id uuid not null references public.ingredients(ingredient_id) on delete cascade,
  quantity_remaining text,
  expiration_date date,
  low_stock_threshold numeric default 0,
  created_at timestamptz default now()
);

-- ---------- Feedback ----------
-- Brew 1:1 Feedback
create table if not exists public.feedback (
  feedback_id uuid primary key default gen_random_uuid(),
  brew_id uuid unique not null references public.brews(brew_id) on delete cascade,
  rating float not null check (rating between 1 and 5),
  taste_notes text not null,
  suggestion text,
  created_at timestamptz default now()
);

-- ---------- Recipe Ratings (star ratings only, no written reviews) ----------
create table if not exists public.recipe_ratings (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references public.recipes(recipe_id) on delete cascade,
  user_id uuid not null references public.users(user_id) on delete cascade,
  stars integer not null check (stars between 1 and 5),
  created_at timestamptz default now(),
  unique(recipe_id, user_id)
);

-- ---------- Saved Recipes (bookmarks / "save drinks for later") ----------
create table if not exists public.saved_recipes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(user_id) on delete cascade,
  recipe_id uuid not null references public.recipes(recipe_id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, recipe_id)
);
