# Brew Master

A personalized, mobile-first coffee brewing platform designed to help home baristas refine their technique, track their supplies, and share recipes.

## Live Application

- **Frontend**: `https://main.XXXXXXXXXX.amplifyapp.com` _(update after Amplify deploy)_
- **API**: `https://7p3imgld3c.execute-api.us-east-1.amazonaws.com/api/health`

## Features

- **Digital Pantry** — Track beans and ingredients with expiration alerts and low-stock notifications
- **Brew Logging** — Record grind, temperature, timing, and beans; get smart-adjust suggestions via feedback
- **Learn Coffee Skills** — Step-by-step tutorials for 6 brewing methods and 3 standard drinks
- **Drink Suggestions** — Filter and search recipes, bookmark favorites, view ingredient swaps
- **Improve Coffee** — Select a brew issue and get tailored grind/temp/time adjustment advice
- **Share With Others** — Browse public recipes, share your own, rate with stars, manage saved recipes

## Tech Stack

| Layer | Technology | Hosting |
|---|---|---|
| Frontend | React PWA (Vite + TailwindCSS) | AWS Amplify |
| Backend | Express API (Node.js) | AWS Lambda + API Gateway |
| Database | PostgreSQL | Supabase |
| Secrets | AWS Secrets Manager | AWS |

## Project Structure

```
/
├── client/           # React PWA (Vite)
│   └── src/
│       ├── pages/    # Home, Pantry, BrewLog, Learn, Suggestions, Improve, Share
│       ├── components/  # Layout, Navigation
│       └── lib/      # api.js (fetch wrapper)
├── api/              # Express API + Lambda handler
│   ├── src/routes/   # brews, recipes, pantry, feedback, ingredients
│   ├── lambda.js     # serverless-http wrapper + AWS Secrets
│   ├── serverless.yml
│   └── openapi.yaml  # API documentation
├── db/               # SQL scripts
│   ├── 01_schema.sql # 8 tables with PKs, FKs, constraints
│   ├── 02_seed.sql   # Realistic seed data (3-5 rows per table)
│   └── 03_policies.sql # Row Level Security policies
├── tests/
│   └── smoke.bat     # cURL smoke tests (Windows)
├── deployment.md     # Deployment resource IDs and commands
└── README.md
```

## Getting Started (Local Development)

### Prerequisites

- Node.js >= 18
- npm >= 9
- A Supabase project with schema applied (`db/01_schema.sql` → `02_seed.sql` → `03_policies.sql`)

### Client

```bash
cd client
npm install
npm run dev        # http://localhost:5173 — proxies /api to localhost:3001
```

### API

```bash
cd api
cp .env.example .env   # fill in SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
npm install
npm run dev            # http://localhost:3001
```

### Environment Variables

**API (`api/.env`)**

| Variable | Required | Description |
|---|---|---|
| `SUPABASE_URL` | Yes | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Service role key (server-side only) |
| `PORT` | No | Server port (default: 3001) |

**Client (Amplify environment variables)**

| Variable | Required | Description |
|---|---|---|
| `VITE_API_BASE` | Yes (prod) | Full API Gateway URL (e.g. `https://xxx.execute-api...`) |
| `VITE_SUPABASE_URL` | No | Supabase URL (informational only; client does not connect directly) |
| `VITE_SUPABASE_ANON_KEY` | No | Anon key (informational only) |

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/brews?user_id=` | List brew logs |
| GET | `/api/brews/:id` | Get single brew |
| POST | `/api/brews` | Create brew log |
| GET | `/api/recipes?user_id=` | List recipes (public + user's private) |
| GET | `/api/recipes/:id` | Get single recipe |
| POST | `/api/recipes` | Create recipe |
| POST | `/api/recipes/:id/ratings` | Rate a recipe (stars 1-5) |
| GET | `/api/pantry?user_id=` | List pantry items (joined with ingredients) |
| POST | `/api/pantry` | Add pantry item |
| PATCH | `/api/pantry/:id` | Update pantry item |
| DELETE | `/api/pantry/:id` | Delete pantry item |
| GET | `/api/feedback/:brew_id` | Get feedback for a brew |
| POST | `/api/feedback` | Submit feedback (triggers smart-adjust suggestion) |
| GET | `/api/ingredients` | List all ingredients |

Full schemas in `api/openapi.yaml`.

## Demo Instructions

1. Open the live Amplify URL
2. The app uses a demo user (`a1000000-0000-0000-0000-000000000001` / Leanne White) by default
3. Navigate using the bottom navigation bar to explore all 7 pages
4. **Brew Log** — Log a new brew (form with validation), view history from Supabase
5. **Pantry** — Add ingredients from the DB catalog, track expiration/stock levels
6. **Share** — Browse public recipes from Supabase, share new recipes, rate with stars
7. **Learn** — Step-by-step tutorials for brewing methods and standard drinks
8. **Suggestions** — Filter mock recipe catalog, bookmark favorites
9. **Improve** — Select a brew issue, receive tailored adjustment advice

## Smoke Tests

```bash
cd tests
smoke.bat    # runs 7 cURL tests against the API (3+ reads, 1+ write)
```

Set `BASE_URL` environment variable to test against a deployed endpoint.

## Known Issues / Incomplete Areas

- **Authentication**: No real login flow implemented; all operations use a hardcoded demo user UUID
- **Role-based views**: Not yet implemented (single user role)
- **Suggestions & Improve pages**: Use client-side mock data (not wired to Supabase)
- **Learn page**: Static tutorial content (by design — not database-driven)
- **Recipe ratings**: Upsert works but average rating display is not yet aggregated
- **Image uploads**: Not implemented
- **Offline PWA**: Service worker registered but offline data sync not implemented

## License

MIT
