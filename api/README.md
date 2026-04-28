# Brew Master API

Express REST API for the Brew Master coffee brewing platform. Connects to Supabase (Postgres) using the service role key.

## Prerequisites

- Node.js >= 18
- npm >= 9
- A Supabase project with the schema from `db/01_schema.sql` applied

## Setup

```bash
cd api
npm install
cp .env.example .env
```

Edit `.env` and fill in your Supabase credentials:

```
SUPABASE_URL=https://<your-project>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
PORT=3001
```

## Run Locally

```bash
npm run dev      # starts on http://localhost:3001 with --watch
npm start        # production start (no watch)
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `SUPABASE_URL` | Yes | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Service role key (server-side only, never expose to client) |
| `PORT` | No | Server port (default: 3001) |

## Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/brews?user_id=` | List brew logs |
| GET | `/api/brews/:id` | Get single brew |
| POST | `/api/brews` | Create brew log |
| GET | `/api/recipes?user_id=` | List recipes |
| GET | `/api/recipes/:id` | Get single recipe |
| POST | `/api/recipes` | Create recipe |
| POST | `/api/recipes/:id/ratings` | Rate a recipe (stars) |
| GET | `/api/pantry?user_id=` | List pantry items |
| POST | `/api/pantry` | Add pantry item |
| PATCH | `/api/pantry/:id` | Update pantry item |
| DELETE | `/api/pantry/:id` | Delete pantry item |
| GET | `/api/feedback/:brew_id` | Get feedback for a brew |
| POST | `/api/feedback` | Submit feedback (smart-adjust) |
| GET | `/api/ingredients` | List ingredients |

Full request/response schemas are documented in `openapi.yaml`.

## Smoke Tests

```bash
cd tests
smoke.bat        # Windows — exercises 4+ endpoints
```

The script reads `BASE_URL` from the environment (defaults to `http://localhost:3001`) and exits non-zero on any failure.
