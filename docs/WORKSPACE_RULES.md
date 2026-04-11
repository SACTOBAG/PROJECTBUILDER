# Brew Master — Workspace Rules

> Coding standards, conventions, and processes for all contributors.

---

## 1. General Principles

- **Mobile-first:** Design and build for 375 px screens first; enhance for larger viewports.
- **Minimal dependencies:** Justify every new package before adding it.
- **Readability over cleverness:** Prefer clear, well-named code over terse abstractions.
- **Small PRs:** Each pull request should address a single task from the Task List.

---

## 2. Project Structure

```
/client/               React PWA (Vite)
  /public/             Static assets (favicon, PWA icons)
  /src/
    /components/       Shared/reusable UI components
    /pages/            Route-level page components
    /lib/              Utility modules (supabase client, helpers)
    /hooks/            Custom React hooks
    /context/          React context providers
    App.jsx            Root component with route definitions
    main.jsx           Entry point
    index.css          Tailwind directives + global styles

/api/                  Express API
  /src/
    /routes/           Express route modules
    /middleware/        Auth, validation, error-handling middleware
    /services/         Business logic (e.g., smartAdjust engine)
    index.js           Server entry point

/supabase/
  /migrations/         Numbered SQL migration files
  seed.sql             Development seed data

/docs/                 Project documentation
```

---

## 3. Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Files & folders | kebab-case | `smart-adjust.js`, `brew-log/` |
| React components | PascalCase file + export | `BrewGuide.jsx` → `export default function BrewGuide` |
| Variables & functions | camelCase | `brewTimeSec`, `handleSubmit` |
| Database columns | snake_case | `water_temp_f`, `created_at` |
| CSS classes | Tailwind utilities; custom classes use kebab-case | `bg-coffee-500`, `.brew-card` |
| Environment variables | UPPER_SNAKE_CASE | `VITE_SUPABASE_URL` |

---

## 4. Code Style

- **Formatter:** Prettier (defaults: 2-space indent, single quotes, trailing commas).
- **Linter:** ESLint with `eslint-config-react-app` as base.
- **No `var`:** Use `const` by default; `let` only when reassignment is needed.
- **Arrow functions** for callbacks; named `function` declarations for top-level/exported functions.
- **Imports:** Group in order — (1) Node built-ins, (2) external packages, (3) internal modules. Separate groups with a blank line.
- **No unused imports or variables** — treat warnings as errors in CI.

---

## 5. React Conventions

- **Functional components only** — no class components.
- **Hooks at the top** of the component body, in consistent order: state → refs → effects → derived.
- **Co-locate** small helper components in the same file; extract to `/components/` when reused.
- **Prop types:** Use JSDoc `@param` comments for now; TypeScript migration planned for v2.
- **Keys:** Always use a stable, unique key (prefer `id` over array index).

---

## 6. API Conventions

- **RESTful routes:** `GET /api/<resource>`, `POST`, `PATCH`, `DELETE`.
- **JSON responses:** Always return `{ data, message }` or `{ error, message }`.
- **HTTP status codes:** 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Server Error.
- **Validation:** Validate request bodies at the route level before calling services.
- **Error handling:** Use a centralized error-handling middleware; never expose stack traces in production.

---

## 7. Database Rules

- **Migrations are append-only** — never edit a committed migration file; create a new one.
- **RLS on every table** — no table should be accessible without a policy.
- **Use `gen_random_uuid()`** for primary keys.
- **Timestamps:** Every table includes `created_at` (auto); mutable tables also include `updated_at`.

---

## 8. Git Workflow

- **Branch naming:** `feat/<task-id>-short-desc`, `fix/<task-id>-short-desc`, `chore/<desc>`.
  - Example: `feat/T-101-step-by-step-brew-view`
- **Commit messages:** Conventional Commits format — `feat:`, `fix:`, `chore:`, `docs:`.
  - Example: `feat(brew): add step-by-step navigation`
- **PR checklist:**
  - [ ] Code compiles without errors
  - [ ] All acceptance criteria for the task are met
  - [ ] No new ESLint warnings
  - [ ] Tested on mobile viewport (375 px)

---

## 9. Environment Variables

- **Never commit `.env` files** — they are in `.gitignore`.
- Store secrets in `.env` locally; use platform env-var settings for deployment.
- Client env vars must be prefixed with `VITE_` to be exposed to the browser.

---

## 10. Testing (planned)

- **Unit tests:** Vitest for client utilities and API services.
- **Component tests:** React Testing Library for key UI flows.
- **API tests:** Supertest for endpoint contracts.
- **E2E (stretch):** Playwright for critical user journeys.

---

## 11. Deployment

| Target | Platform | Notes |
|---|---|---|
| Client | Netlify | Auto-deploy from `main`; build command: `cd client && npm run build` |
| API | Render / Railway | Auto-deploy from `main`; start command: `cd api && npm start` |
| Database | Supabase | Migrations applied via Supabase CLI or dashboard |
