# Maple & Pine Command Center

A real-time operational dashboard for the Maple & Pine holding company —
**WiseMinds Studios**, **Black Goat Wood Works**, **Element No.34**,
**Maddy Made Them**, and **Eats & Treats** — backed by your Notion
OmniStack workspace.

Built with Next.js (App Router) + TypeScript + Tailwind CSS. All Notion API
calls happen server-side in `app/api/**` route handlers via the official
`@notionhq/client` SDK — your integration token never reaches the browser.

## 1. Quick start

```bash
npm install
cp .env.example .env   # then fill in the values, see section 4 below
npm run dev
```

Open http://localhost:3000. The dashboard polls Notion every 5 minutes by
default (configurable) and also refreshes on demand via the header button.

## 2. Layout

One page, seven panels:

| Panel | Component | Data source |
|---|---|---|
| Header (status, last synced, manual refresh) | `components/Header.tsx` | Derived from all panel results |
| Entity Overview Strip | `components/EntityOverviewStrip.tsx` | `app/api/entities` (derived from Projects + Calendar) |
| Project & Release Status Board | `components/ProjectBoard.tsx` | `app/api/projects` → Projects database |
| Release Calendar | `components/ReleaseCalendar.tsx` | `app/api/calendar` → Release Calendar database |
| Revenue & Financials | `components/FinancialsPanel.tsx` | `app/api/financials` → Financials database (optional) |
| Team & AI-Agent Activity | `components/TeamActivityPanel.tsx` | `app/api/team` → Team Activity database (optional) |
| Quick Actions footer | `components/QuickLinksFooter.tsx` | `NEXT_PUBLIC_QUICK_LINKS` env var |

Every panel independently renders a **loading**, **empty**, or **error**
state — one failed Notion query never breaks the rest of the page. Each API
route always responds `200` with a `{ ok: true, data }` or
`{ ok: false, error }` envelope (see `lib/api-helpers.ts`), so the client
never has to parse a raw thrown error.

## 3. Notion schema this app expects

Map these to your actual OmniStack databases. Property names are matched
literally (case-sensitive) in `lib/notion.ts` — rename the strings there if
your workspace uses different labels.

### Projects database (`NOTION_PROJECTS_DATABASE_ID`) — required

| Property | Type | Notes |
|---|---|---|
| `Name` | Title | Project/IP name |
| `Entity` | Select | Must match one of the five entity names in `lib/config.ts` `ENTITIES[].notionValue` |
| `Status` | Status or Select | Free text, normalized to on-track/at-risk/blocked via keyword matching in `lib/status.ts` |
| `Phase` | Select or Text | Optional — current production phase |
| `% Complete` | Number | Optional — accepts either 0–1 or 0–100 |
| `Owner` | Person or Text | Optional |
| `Next Milestone` | Date | Optional — feeds both the project card and the Entity Overview Strip's "next deadline" |

### Release Calendar database (`NOTION_CALENDAR_DATABASE_ID`) — required

| Property | Type | Notes |
|---|---|---|
| `Name` | Title | Release/launch/event name |
| `Entity` | Select | Same value set as above |
| `Date` | Date | Required — rows without a date are skipped |
| `Type` | Select | Optional — e.g. "Release", "Launch", "Key Date" |

### Financials database (`NOTION_FINANCIALS_DATABASE_ID`) — optional

Leave unset and the panel shows **"No financial data connected"** instead
of erroring.

| Property | Type | Notes |
|---|---|---|
| `Entity` | Title or Select | Matched against the same entity list |
| `Revenue` | Number | Required per row |
| `Period` | Date or Text | Optional label, e.g. "2026 Q3" |
| `Currency` | Text or Select | Optional, defaults to USD |

### Team & AI-Agent Activity database (`NOTION_TEAM_DATABASE_ID`) — optional

Leave unset and the panel shows a labeled placeholder for the AI roster
(Chad, Claude, Dispatch, Codey, Gem, Manus, Main AI Brain) with the schema
needed to populate it, instead of erroring.

| Property | Type | Notes |
|---|---|---|
| `Name` | Title | Agent/team-member name |
| `Role` | Text or Select | Optional |
| `Status` | Status or Select | Optional, normalized the same way as project status |
| `Current Assignment` | Text | Optional — what they're working on right now |
| `Entity` | Select | Optional |

## 4. Setup guide: connecting your Notion workspace

1. **Create the integration.** Go to https://www.notion.so/my-integrations
   → **New integration**. Name it (e.g. "Maple & Pine Command Center"),
   select your workspace, and set capabilities to **Read content** only
   (this dashboard never writes to Notion). Save, then copy the **Internal
   Integration Secret** — this is your `NOTION_TOKEN`.

2. **Share each database with the integration.** Open each of the Notion
   databases listed in section 3 (Projects, Release Calendar, and
   optionally Financials / Team Activity) → **···** menu → **Connections**
   → add your integration by name. Without this step the API will return a
   403/"object not found" error even with a valid token.

3. **Get each database ID.** Open the database as a full page in your
   browser. The URL looks like:

   ```
   https://www.notion.so/your-workspace/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p?v=...
   ```

   The 32-character segment right after your workspace name (before any
   `?v=`) is the database ID — copy it into the matching `NOTION_*_DATABASE_ID`
   variable in `.env`.

4. **Fill in `.env`.** Copy `.env.example` to `.env` and set:
   - `NOTION_TOKEN`
   - `NOTION_PROJECTS_DATABASE_ID`
   - `NOTION_CALENDAR_DATABASE_ID`
   - `NOTION_FINANCIALS_DATABASE_ID` (optional)
   - `NOTION_TEAM_DATABASE_ID` (optional)
   - `NEXT_PUBLIC_REFRESH_INTERVAL_MS` (optional, default 300000 = 5 min)
   - `NEXT_PUBLIC_QUICK_LINKS` (optional, JSON array for the footer links)

5. **Run it.** `npm install && npm run dev`, then open
   http://localhost:3000. The header's status dot turns green once every
   required panel can reach Notion.

## 5. Notes on refresh behavior

`hooks/useDashboardData.ts` runs all five panel queries as one coordinated
cycle — on mount, on the configured interval, and on manual refresh clicks.
An in-flight guard (`inFlightRef`) prevents a slow cycle from overlapping
the next timer tick or a manual click, so there's never a duplicate/racing
request. The header's connection dot and "last synced" timestamp reflect
the most recent completed cycle across all panels.

## 6. Deploying

Any Next.js host works (Vercel, etc.). Set the same environment variables
in your host's dashboard — `NOTION_TOKEN` and the `NOTION_*_DATABASE_ID`
variables must stay server-only secrets, never `NEXT_PUBLIC_`.
