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

| Source | Module | Purpose | Mode variable |
|---|---|---|---|
| Notion (OmniStack) | `notion.ts` | Tasks, project/release status, AI-agent activity, revenue tracker | `VITE_NOTION_MODE` |
| Google Calendar | `google-calendar.ts` | Today's scheduled events/deadlines | `VITE_GOOGLE_CALENDAR_MODE` |
| Google Drive | `google-drive.ts` | Recently modified project files | `VITE_GOOGLE_DRIVE_MODE` |
| Gmail | `gmail.ts` | Flagged threads needing a reply (subject + sender + snippet only) | `VITE_GMAIL_MODE` |

Set a mode to `live` and supply its credentials (see `.env.example`) to wire
up the real API. Each live function currently throws a clear "not yet
implemented" error naming the exact endpoint it should call — that's the
seam to fill in once OAuth is set up on your end; the mock path keeps
working for every other source in the meantime.

Copy `.env.example` to `.env.local` and fill in what you need:

```bash
cp .env.example .env.local
```

### Wiring up each connection

- **Notion** — create an internal integration at
  [notion.so/my-integrations](https://www.notion.so/my-integrations), share
  your tasks/projects/calendar/agent-log databases with it, and drop the
  token + database IDs into `.env.local`.
- **Google Calendar / Drive / Gmail** — these need an OAuth2 access token
  scoped read-only (`calendar.readonly`, `drive.readonly`,
  `gmail.readonly`). The simplest path for a personal dashboard is Google's
  [OAuth 2.0 Playground](https://developers.google.com/oauthplayground) to
  mint a token for local use; for anything longer-lived, set up a proper
  OAuth client and refresh-token flow.

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
