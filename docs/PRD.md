# Brew Master — Product Requirements Document (PRD)

## 1. Overview

**Product Name:** Brew Master
**Version:** 0.1.0 (MVP)
**Last Updated:** 2026-04-11

Brew Master is a mobile-first progressive web application that guides home baristas through step-by-step coffee brewing, provides personalized "Smart Adjust" feedback, and helps manage beans, recipes, and weekly drink planning — all in one place.

---

## 2. Problem Statement

Home coffee enthusiasts often waste expensive specialty beans due to inconsistent technique. Existing brewing apps provide static recipes without personalized feedback. Users lack a single tool that combines guided brewing, data-driven adjustment, ingredient management, and community-driven recipe discovery.

---

## 3. Target Personas

| Persona | Pain Points | Goals |
|---|---|---|
| **Emily** (morning routine optimizer) | Wastes expensive beans; inconsistent results before work | Consistent, quick brews with minimal experimentation |
| **Mark** (data-driven remote dev) | No way to track and compare brew variables over time | Data trends, side-by-side brew comparisons, optimization |
| **Leanne** (budget-conscious student) | Overspending on beans; no expiration tracking | Budget-friendly routines, pantry alerts, swap suggestions |
| **Anna** (health-conscious mom) | Wants healthier alternatives without sacrificing taste | Healthy ingredient swaps, calorie-aware recipes |

---

## 4. Core Features

### 4.1 Brewing Guidance
- Step-by-step visual + text tutorials for each method (French Press, Pour Over, AeroPress, Cold Brew, etc.)
- Built-in brew timers synchronized to each step
- Default parameters (grind, temp, time) per method

### 4.2 Smart Adjust
- After each brew, user rates the cup with taste descriptors ("too bitter", "too sour", "too weak", etc.)
- Rule-based engine (v1) suggests specific changes to grind size, water temperature, brew time, and coffee dose
- Future: ML-based recommendations using brew-log history

### 4.3 Digital Pantry
- CRUD inventory for beans, milk, syrups, and other ingredients
- Expiration date tracking with push/in-app alerts
- Low-stock threshold notifications
- Quantity tracking by weight/volume

### 4.4 Brew Logging
- Log each brew with: method, bean name/roast, grind size, water temp, brew time, coffee-to-water ratio, flavor notes, rating
- View history sorted/filtered by date, method, rating
- Side-by-side comparison of two brew logs (Mark persona)

### 4.5 Social & Discovery
- Publish recipes as public or keep private
- Community recipe feed with search and tag filters
- Reviews and star ratings on public recipes
- "Healthier Swap" suggestions on ingredients (e.g., oat milk for cream)

### 4.6 Organization
- Weekly drink planner (7-day grid, multiple time slots per day)
- Favorite recipe organizer (bookmarks)

---

## 5. Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Frontend | React 18 + Vite | PWA via vite-plugin-pwa |
| Styling | TailwindCSS 3 | Mobile-first, custom coffee palette |
| Icons | Lucide React | Lightweight, tree-shakeable |
| Routing | React Router v6 | Nested layout routes |
| Backend | Express 4 (Node) | REST API under `/api/*` |
| Database | Supabase (Postgres) | Auth, RLS, Realtime |
| Auth | Supabase Auth | Email/password + OAuth |

---

## 6. Information Architecture

```
Home
├── Brew Guide (method selector → step-by-step view)
├── Brew Log (list → detail / compare)
├── Digital Pantry (list → add/edit item)
├── Recipes (feed → detail → reviews)
├── Weekly Planner (7-day grid)
└── Profile / Settings
```

---

## 7. Non-Functional Requirements

- **Performance:** Lighthouse PWA score ≥ 90; Time to Interactive < 3 s on 4G
- **Offline:** Core brew guides cached via service worker for offline use
- **Accessibility:** WCAG 2.1 AA — semantic HTML, proper contrast, keyboard nav
- **Security:** Supabase RLS on every table; no service-role key exposed to client
- **Responsive:** Designed mobile-first (375 px), scales to tablet/desktop

---

## 8. Success Metrics (MVP)

| Metric | Target |
|---|---|
| Brew logs per active user/week | ≥ 3 |
| Smart Adjust usage rate | ≥ 50 % of logged brews |
| Pantry items tracked per user | ≥ 2 |
| Recipes published (community) | ≥ 20 in first month |

---

## 9. Out of Scope (v1)

- Native mobile apps (iOS/Android)
- E-commerce / bean purchasing integration
- ML-based Smart Adjust (deferred to v2)
- Real-time multiplayer brew sessions
- Paid subscription tier

---

## 10. Milestones

| Phase | Scope | Target |
|---|---|---|
| **M0 — Scaffold** | Project structure, DB schema, basic routing | Week 1 |
| **M1 — Brew Guide** | Method CRUD, step-by-step UI, timers | Week 2-3 |
| **M2 — Smart Adjust + Logging** | Feedback form, rule engine, brew log CRUD | Week 3-4 |
| **M3 — Pantry** | Inventory CRUD, expiration alerts | Week 4-5 |
| **M4 — Recipes & Social** | Recipe CRUD, reviews, healthy swaps | Week 5-6 |
| **M5 — Planner & Polish** | Weekly planner, favorites, PWA polish | Week 6-7 |
| **M6 — Launch** | Testing, performance audit, deploy | Week 8 |
