-- ============================================================
-- Brew Master — Initial Schema
-- ============================================================

-- ---------- Users (extends Supabase auth.users) ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  taste_preference jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ---------- Brewing Methods ----------
create table if not exists public.brewing_methods (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  default_grind text,
  default_water_temp_f integer,
  default_brew_time_sec integer,
  steps jsonb default '[]',
  image_url text,
  created_at timestamptz default now()
);

-- ---------- Brew Logs ----------
create table if not exists public.brew_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  method_id uuid references public.brewing_methods(id) on delete set null,
  bean_name text,
  bean_roast text,
  grind_size text,
  water_temp_f integer,
  brew_time_sec integer,
  coffee_grams numeric(6,1),
  water_ml numeric(7,1),
  ratio text,
  flavor_notes text[],
  rating integer check (rating between 1 and 5),
  taste_feedback text,
  smart_adjust_suggestion jsonb default '{}',
  notes text,
  brewed_at timestamptz default now(),
  created_at timestamptz default now()
);

-- ---------- Digital Pantry ----------
create table if not exists public.pantry_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  category text default 'beans',
  quantity numeric(8,2) default 0,
  unit text default 'g',
  expiration_date date,
  low_stock_threshold numeric(8,2),
  image_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ---------- Recipes ----------
create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  method_id uuid references public.brewing_methods(id) on delete set null,
  ingredients jsonb default '[]',
  steps jsonb default '[]',
  tags text[],
  is_public boolean default false,
  healthy_swaps jsonb default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ---------- Reviews ----------
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  rating integer check (rating between 1 and 5),
  comment text,
  created_at timestamptz default now()
);

-- ---------- Weekly Planner ----------
create table if not exists public.planner_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  recipe_id uuid references public.recipes(id) on delete set null,
  day_of_week integer check (day_of_week between 0 and 6),
  time_slot text,
  notes text,
  created_at timestamptz default now()
);

-- ---------- Favorites ----------
create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, recipe_id)
);

-- ---------- Row Level Security ----------
alter table public.profiles enable row level security;
alter table public.brew_logs enable row level security;
alter table public.pantry_items enable row level security;
alter table public.recipes enable row level security;
alter table public.reviews enable row level security;
alter table public.planner_entries enable row level security;
alter table public.favorites enable row level security;

-- Profiles: users can read any profile, update only their own
drop policy if exists "Profiles are viewable by everyone" on public.profiles;
create policy "Profiles are viewable by everyone" on public.profiles for select using (true);
drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- Brew logs: private to owner
drop policy if exists "Users can CRUD own brew logs" on public.brew_logs;
create policy "Users can CRUD own brew logs" on public.brew_logs for all using (auth.uid() = user_id);

-- Pantry: private to owner
drop policy if exists "Users can CRUD own pantry" on public.pantry_items;
create policy "Users can CRUD own pantry" on public.pantry_items for all using (auth.uid() = user_id);

-- Recipes: public readable, owner writable
drop policy if exists "Public recipes are viewable" on public.recipes;
create policy "Public recipes are viewable" on public.recipes for select using (is_public or auth.uid() = author_id);
drop policy if exists "Users can CRUD own recipes" on public.recipes;
create policy "Users can CRUD own recipes" on public.recipes for all using (auth.uid() = author_id);

-- Reviews: readable by all, writable by owner
drop policy if exists "Reviews are viewable" on public.reviews;
create policy "Reviews are viewable" on public.reviews for select using (true);
drop policy if exists "Users can CRUD own reviews" on public.reviews;
create policy "Users can CRUD own reviews" on public.reviews for all using (auth.uid() = user_id);

-- Planner: private to owner
drop policy if exists "Users can CRUD own planner" on public.planner_entries;
create policy "Users can CRUD own planner" on public.planner_entries for all using (auth.uid() = user_id);

-- Favorites: private to owner
drop policy if exists "Users can CRUD own favorites" on public.favorites;
create policy "Users can CRUD own favorites" on public.favorites for all using (auth.uid() = user_id);
