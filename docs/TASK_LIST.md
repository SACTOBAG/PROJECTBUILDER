# Brew Master — Task List with Acceptance Criteria

> Status legend: `[ ]` To Do · `[~]` In Progress · `[x]` Done

---

## M0 — Project Scaffold

### [x] T-001: Repository & folder structure
- **AC:** `/client`, `/api`, `/supabase`, `/docs` directories exist with placeholder files.
- **AC:** `.gitignore` excludes `node_modules/`, `.env`, `.DS_Store`, and build artifacts.
- **AC:** `README.md` documents project overview, tech stack, and getting-started instructions.

### [x] T-002: Database schema migration
- **AC:** `supabase/migrations/001_initial_schema.sql` creates tables: `profiles`, `brewing_methods`, `brew_logs`, `pantry_items`, `recipes`, `reviews`, `planner_entries`, `favorites`.
- **AC:** Row Level Security policies are defined for every table.

### [x] T-003: Seed data
- **AC:** `supabase/seed.sql` inserts at least 4 brewing methods (French Press, Pour Over, AeroPress, Cold Brew) with default parameters and step arrays.

### [x] T-004: Client scaffold (Vite + React + TailwindCSS + PWA)
- **AC:** `npm run dev` starts Vite dev server on port 5173.
- **AC:** TailwindCSS compiles with custom coffee color palette.
- **AC:** PWA manifest is configured with app name, theme color, and icons.
- **AC:** React Router v6 routes are wired: `/`, `/brew`, `/log`, `/pantry`, `/recipes`, `/planner`.

### [x] T-005: API scaffold (Express)
- **AC:** `npm run dev` starts Express on port 3001.
- **AC:** `/api/health` returns `{ status: "ok" }`.
- **AC:** Route files exist for `/api/brews`, `/api/pantry`, `/api/recipes`, `/api/smart-adjust`.

### [x] T-006: Documentation — PRD, Task List, Workspace Rules
- **AC:** `docs/PRD.md` covers problem, personas, features, tech stack, milestones.
- **AC:** `docs/TASK_LIST.md` lists every task with acceptance criteria.
- **AC:** `docs/WORKSPACE_RULES.md` defines coding standards and conventions.

---

## M1 — Brewing Guidance

### [ ] T-100: Fetch brewing methods from Supabase
- **AC:** API endpoint `GET /api/brews/methods` returns all rows from `brewing_methods`.
- **AC:** Client displays a selectable list of brewing methods.

### [ ] T-101: Step-by-step brew view
- **AC:** Selecting a method renders each step sequentially with title, description, and step number.
- **AC:** User can navigate forward/backward between steps.

### [ ] T-102: Brew timer per step
- **AC:** Each step that has a duration displays a countdown timer.
- **AC:** Timer emits an audible/visual alert when complete.
- **AC:** Timer works when the screen is locked (via Web Worker or Notification API).

### [ ] T-103: Responsive brew UI
- **AC:** Brew guide is fully usable at 375 px width.
- **AC:** Step cards, timers, and controls are touch-friendly (min tap target 44 px).

---

## M2 — Smart Adjust & Brew Logging

### [ ] T-200: Brew log creation form
- **AC:** Form captures: method, bean name, roast, grind size, water temp, brew time, dose, water volume, ratio, flavor notes, rating (1-5).
- **AC:** Validation prevents submission with missing required fields (method, rating).
- **AC:** Successful submit writes to `brew_logs` table and shows confirmation.

### [ ] T-201: Brew log list & detail views
- **AC:** `/log` displays a paginated, reverse-chronological list of the user's brew logs.
- **AC:** Each card shows method, date, rating, and bean name.
- **AC:** Tapping a card opens a detail view with all logged fields.

### [ ] T-202: Smart Adjust feedback form
- **AC:** After logging, user is prompted with taste feedback options: "too bitter", "too sour/acidic", "too weak/watery", "too strong", "just right".
- **AC:** Selecting feedback calls `POST /api/smart-adjust` with current brew parameters.
- **AC:** Returned suggestions are displayed clearly with recommended changes.

### [ ] T-203: Smart Adjust rule engine (API)
- **AC:** Engine maps "bitter" → coarser grind, lower temp, shorter time.
- **AC:** Engine maps "sour/acidic" → finer grind, higher temp, longer time.
- **AC:** Engine maps "weak/watery" → finer grind, more coffee, longer time.
- **AC:** Engine maps "strong/intense" → coarser grind, less coffee.
- **AC:** "Just right" returns encouragement with no changes.
- **AC:** Suggestions are persisted in `brew_logs.smart_adjust_suggestion`.

### [ ] T-204: Side-by-side brew comparison
- **AC:** User can select two brew logs and view them in a comparison layout.
- **AC:** Differences in grind, temp, time, rating are visually highlighted.

---

## M3 — Digital Pantry

### [ ] T-300: Pantry CRUD
- **AC:** User can add an item with: name, category (beans/milk/syrup/other), quantity, unit, expiration date, low-stock threshold.
- **AC:** User can edit and delete items.
- **AC:** List view shows items grouped by category.

### [ ] T-301: Expiration alerts
- **AC:** Items expiring within 3 days are flagged with a warning badge.
- **AC:** Expired items are flagged red.
- **AC:** (Optional) Push notification for upcoming expirations.

### [ ] T-302: Low-stock notifications
- **AC:** Items whose quantity is at or below the threshold display a "low stock" badge.
- **AC:** Home page shows a summary count of low-stock and expiring items.

---

## M4 — Recipes & Social

### [ ] T-400: Recipe CRUD
- **AC:** User can create a recipe with: title, description, method, ingredients (JSON array), steps (JSON array), tags, public/private toggle.
- **AC:** User can edit and delete their own recipes.
- **AC:** Public recipes appear in the community feed.

### [ ] T-401: Recipe feed & search
- **AC:** `/recipes` shows a feed of public recipes, newest first.
- **AC:** User can search by title or filter by tag.
- **AC:** Each card shows title, author, rating average, and tags.

### [ ] T-402: Reviews & ratings
- **AC:** Authenticated users can leave a rating (1-5) and comment on a public recipe.
- **AC:** Recipe detail page shows average rating and a list of reviews.

### [ ] T-403: Healthy swap suggestions
- **AC:** Recipe detail shows suggested ingredient swaps (e.g., "Try oat milk instead of whole milk — fewer calories, similar texture").
- **AC:** Swaps are stored in `recipes.healthy_swaps` JSON column.

---

## M5 — Planner & Favorites

### [ ] T-500: Weekly planner grid
- **AC:** 7-day grid view with time slots (morning, afternoon, evening).
- **AC:** User can assign a recipe/method to a slot via tap → picker.
- **AC:** Data persists in `planner_entries`.

### [ ] T-501: Favorite recipes
- **AC:** User can bookmark/un-bookmark any recipe.
- **AC:** A "Favorites" section on the recipes page shows bookmarked recipes.

### [ ] T-502: Planner pantry integration
- **AC:** When a planned brew uses a pantry item, the planner shows estimated ingredient usage.
- **AC:** (Stretch) Warn if planned brews will exceed available stock.

---

## M6 — Polish & Launch

### [ ] T-600: Supabase Auth integration
- **AC:** Sign-up, sign-in, sign-out flows work via Supabase Auth (email/password).
- **AC:** Protected routes redirect unauthenticated users to sign-in.
- **AC:** Profile row is created on first sign-up via trigger or client logic.

### [ ] T-601: PWA audit & offline support
- **AC:** Lighthouse PWA score ≥ 90.
- **AC:** Brew guide steps are available offline after first load.
- **AC:** App is installable on mobile home screen.

### [ ] T-602: Accessibility audit
- **AC:** All interactive elements are keyboard-navigable.
- **AC:** Color contrast meets WCAG 2.1 AA.
- **AC:** Screen reader testing passes for core flows.

### [ ] T-603: Performance optimization
- **AC:** Bundle size < 200 KB gzipped.
- **AC:** Time to Interactive < 3 s on simulated 4G.
- **AC:** Images are lazy-loaded and appropriately sized.

### [ ] T-604: Deployment
- **AC:** Client deployed to Netlify (or similar) with environment variables configured.
- **AC:** API deployed to Render / Railway / Fly.io.
- **AC:** Supabase production project provisioned and migrated.
