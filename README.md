# Maple & Pine Command Center

A single-page, dark command-center dashboard for Maple & Pine Co. — the holding
company behind **WiseMinds Studios**, **Black Goat Wood Works**, **Element
No.34**, **Maddy Made Them**, and **Eats & Treats**.

Everything lives on one scrollable page: today's action items, revenue,
project/release status, an upcoming release calendar, the AI agent roster,
and a files/comms pulse — with a sticky nav that jump-links between them.

## Quick start

```bash
npm install
npm run dev
```

That's it — the dashboard loads fully populated with realistic mock data.
No API keys or accounts are required to explore it.

## Tech stack

- React + TypeScript, built with Vite
- Tailwind CSS v4 (dark, desaturated command-center palette)
- Recharts for the revenue trend chart
- React hooks + Context for state (no Redux)

## Project structure

```
src/
  components/
    sections/        one component per dashboard section
    ui/               shared primitives (StatusBadge, EntityTag, Panel, ...)
  context/
    DashboardContext.tsx   coordinated fetch, 5-minute auto-refresh, optimistic task completion
  lib/
    data-sources/     one module per external source (see below)
    action-items.ts   merges Notion + Calendar + Gmail into "today"
    format.ts, status.ts, sections.ts
  types/
    dashboard.ts      shared domain types every source speaks
```

## Data sources

Each of the four external integrations lives in its own module under
`src/lib/data-sources/`, and each independently resolves to mock or live
data via its own environment variable — flipping one to live never touches
component code.

| Source | Module | Purpose | Mode variable | Live status |
|---|---|---|---|---|
| Notion (OmniStack) | `notion.ts` | Tasks, project/release status, AI-agent activity, revenue tracker | `VITE_NOTION_MODE` | **AI Agent Activity and Release Calendar are wired up.** Tasks/Projects are still mock-only (see note below). |
| Google Calendar | `google-calendar.ts` | Today's scheduled events/deadlines | `VITE_GOOGLE_CALENDAR_MODE` | Mock-only — needs a server-side proxy (see Architecture below) |
| Google Drive | `google-drive.ts` | Recently modified project files | `VITE_GOOGLE_DRIVE_MODE` | Mock-only — needs a server-side proxy |
| Gmail | `gmail.ts` | Flagged threads needing a reply (subject + sender + snippet only) | `VITE_GMAIL_MODE` | Mock-only — needs a server-side proxy |

Copy `.env.example` to `.env.local` and fill in what you need:

```bash
cp .env.example .env.local
```

### Architecture: secrets never go in the browser

This matters once you deploy anywhere beyond your own `localhost`. Vite
bundles every `VITE_`-prefixed env var straight into the client-side JS —
anyone who opens dev tools on a deployed site can read it. Real credentials
(API tokens, OAuth access tokens) are never set as `VITE_*` vars here.
Instead:

- Real secrets live in plain (non-`VITE_`) env vars, read only by small
  serverless functions under `/api/` — e.g. `api/notion-agent-activity.js`.
  Set these in your deployment platform's project settings (Vercel →
  Project → Settings → Environment Variables), not in `.env.local` for
  production.
- The browser calls `fetch('/api/notion-agent-activity')` — a same-origin,
  unauthenticated-from-the-client request — and the serverless function is
  the only thing that ever attaches the real Notion token.
- `VITE_*_MODE` vars (`mock`/`live`) are *not* secrets and are fine
  client-side — they just toggle which code path runs.
- Local testing of `/api/` routes requires the Vercel CLI, since plain
  `vite dev` doesn't execute serverless functions:
  ```bash
  npm install -g vercel
  vercel dev
  ```
  Plain `npm run dev` still works for everything else — mock mode is the
  default, so you only need `vercel dev` when testing a live integration.

### Wiring up AI Agent Activity (the one real integration today)

1. Create a Notion internal integration at
   [notion.so/my-integrations](https://www.notion.so/my-integrations) and
   copy its token.
2. In Notion, share the **"OMNISTACK — Handoff Ledger"** database with that
   integration (•••  menu → Connections → add the integration).
3. Set these as server-side env vars (Vercel project settings, or
   `.env.local` for `vercel dev`):
   ```
   NOTION_API_KEY=secret_...
   NOTION_HANDOFF_LEDGER_DATA_SOURCE_ID=7b47767d-8ad6-4003-8a27-6a0bf67f9bd8
   ```
   That data source id is the real "OMNISTACK — Handoff Ledger" in the
   Maple & Pine workspace — no need to look it up again unless the database
   is recreated.
4. Set `VITE_NOTION_MODE=live` (this one's safe client-side — it's just a
   flag).
5. `vercel dev` locally, or deploy — the Agent Activity section will now
   show real status/assignment/handoffs for Chad, Claude, Dispatch, Codey,
   Gem, Manus, and Main AI Brain, derived from the ledger's `From`/`To`/
   `Authority`/`Status` fields.

### Wiring up Release & Ritual Calendar

1. Same Notion integration as above (one token covers every database you
   share with it).
2. Share the **"Master Release Calendar"** database with the integration
   (not the "2027 Release Calendar" database — that one's a sparse,
   mostly-empty placeholder for a different, TCG-specific product line; the
   Master calendar is the real, actively-maintained one).
3. Add this server-side env var alongside the others:
   ```
   NOTION_RELEASE_CALENDAR_DATA_SOURCE_ID=ec3cc5f8-1f79-4c75-ad47-c09322f09b1e
   ```
4. `VITE_NOTION_MODE=live` (same flag covers both Notion integrations).
5. Every row from this database is a WiseMinds Studios property, so entity
   is hardcoded to `wiseminds` rather than resolved from Notion — the
   database's own "Release Type" field (Book Release, Festival Special,
   Council Gate Review, etc.) maps onto this dashboard's 4-way
   release/marketing/ritual/deadline kind.

### Why Tasks and Projects are still mock

Checked the real Notion workspace directly before wiring anything, and both
have real blockers — not just "pick the right database":

- **Tasks**: multiple candidate databases exist, and the canonical one tags
  brand with a **"Division" field** broader than this dashboard's five
  entities (Black Goat, Element No.34, Maddy Made Them, and Eats & Treats
  all collapse into one "Consumer Brands" value) — so a live per-entity
  breakdown wouldn't actually distinguish between them without a workspace
  change.
- **Projects**: the canonical WiseMinds project tracker
  ("Studio_Projects") is **completely empty** — zero rows. The client-work
  tracker has exactly one row, still marked "Prospect." Black Goat's
  commissions aren't in a queryable database at all, just a section inside
  a hub page. Wiring this live today would show *less* than the current
  mock data, not more — the gap is real data in Notion, not code.
- No live, transaction-level **revenue tracker** was found either — just
  strategy pages and a few pages literally titled "[PLACEHOLDER]".

Each of these live functions throws a clear "not yet implemented" error
naming what's blocking it (see `src/lib/data-sources/notion.ts`) — the mock
path keeps working for all of them in the meantime.

### Google Calendar / Drive / Gmail

Not yet wired to live data. These need the same server-side-proxy treatment
as Notion (an OAuth access token is a real secret, same rule as above) —
add `api/google-calendar-events.js`, `api/google-drive-files.js`, and
`api/gmail-flagged-threads.js` following the `api/notion-agent-activity.js`
pattern, each holding its own token server-side.

All four sources auto-refresh every 5 minutes once live, with a per-section
"last updated" timestamp and a single "last synced" indicator in the header.

## Design notes

- Near-black base palette (not pure black) with one teal accent for
  interactive elements.
- Revenue gets its own muted-gold treatment so money reads visually
  distinct from the rest of the dashboard.
- Status (on-track / at-risk / blocked) always pairs color with a dot and a
  text label — never color alone — and uses the same palette everywhere
  it appears (tasks, projects, calendar).
- Fully responsive from 375px mobile up through ultra-wide desktop.

## Scripts

```bash
npm run dev       # start the dev server
npm run build     # type-check and build for production
npm run preview   # preview the production build
npm run lint      # run oxlint
```
