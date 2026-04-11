# Brew Master

A personalized, step-by-step coffee brewing platform designed to help home baristas refine their technique and minimize waste.

## Features

- **Brewing Guidance** — Step-by-step visual and text tutorials for French Press, Pour Over, and more.
- **Smart Adjust** — A feedback loop that suggests grind, temperature, and timing changes based on your taste ratings.
- **Digital Pantry** — Inventory tracking for beans and ingredients with expiration alerts and low-stock notifications.
- **Brew Logging** — Detailed history of brew times, ratios, bean types, and flavor profiles.
- **Social & Discovery** — Share custom recipes, write reviews, and get healthier ingredient swap suggestions.
- **Weekly Planner** — Plan your weekly drinks and organize favorite recipes.

## Tech Stack

| Layer    | Technology        |
|----------|-------------------|
| Frontend | React PWA (Vite)  |
| Backend  | Express API (Node) |
| Database | Supabase          |

## Project Structure

```
/
├── client/          # React PWA (Vite)
├── api/             # Express API
├── supabase/        # SQL migrations + seeds
├── docs/            # PRD, Task List, Workspace Rules
├── README.md
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9
- A Supabase project (set env vars in `.env` files)

### Client (React PWA)

```bash
cd client
npm install
npm run dev        # starts Vite dev server on http://localhost:5173
```

### API (Express)

```bash
cd api
npm install
npm run dev        # starts Express dev server on http://localhost:3001
```

### Environment Variables

Copy the example env files and fill in your Supabase credentials:

```bash
cp client/.env.example client/.env
cp api/.env.example api/.env
```

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous/public key |
| `SUPABASE_URL` | Supabase project URL (API) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service-role key (API) |
| `PORT` | Express server port (default 3001) |

## License

MIT
