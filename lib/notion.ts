import { Client, isFullPage } from "@notionhq/client";
import type {
  PageObjectResponse,
  QueryDatabaseParameters,
} from "@notionhq/client/build/src/api-endpoints";
import { entityIdForNotionValue, entityNameForNotionValue } from "./config";
import { normalizeStatus } from "./status";
import type { CalendarItem, FinancialItem, ProjectItem, TeamActivityItem } from "./types";

/**
 * Server-only Notion access layer. NEVER import this file from a Client
 * Component — it reads process.env.NOTION_TOKEN directly and is only safe
 * to run inside app/api/** route handlers (Node runtime).
 */

export class NotionConfigError extends Error {}
export class NotionQueryError extends Error {}

let cachedClient: Client | null = null;

function getClient(): Client {
  const token = process.env.NOTION_TOKEN;
  if (!token) {
    throw new NotionConfigError(
      "NOTION_TOKEN is not set. Add it to your .env file — see .env.example."
    );
  }
  if (!cachedClient) {
    cachedClient = new Client({ auth: token });
  }
  return cachedClient;
}

function requireDatabaseId(envVar: string): string {
  const id = process.env[envVar];
  if (!id) {
    throw new NotionConfigError(
      `${envVar} is not set. Add it to your .env file — see .env.example.`
    );
  }
  return id;
}

async function queryAllPages(
  databaseId: string,
  params: Omit<QueryDatabaseParameters, "database_id"> = {}
): Promise<PageObjectResponse[]> {
  const client = getClient();
  const pages: PageObjectResponse[] = [];
  let cursor: string | undefined;

  try {
    do {
      const response = await client.databases.query({
        database_id: databaseId,
        start_cursor: cursor,
        ...params,
      });
      for (const result of response.results) {
        if (isFullPage(result)) pages.push(result);
      }
      cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
    } while (cursor);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown Notion API error";
    throw new NotionQueryError(`Notion query failed: ${message}`);
  }

  return pages;
}

// ---- Property extraction helpers -----------------------------------------

function prop(page: PageObjectResponse, name: string) {
  return page.properties[name];
}

function getTitleText(page: PageObjectResponse, name: string): string | null {
  const p = prop(page, name);
  if (!p || p.type !== "title") return null;
  return p.title.map((t) => t.plain_text).join("") || null;
}

function getSelectName(page: PageObjectResponse, name: string): string | null {
  const p = prop(page, name);
  if (!p) return null;
  if (p.type === "select") return p.select?.name ?? null;
  if (p.type === "status") return p.status?.name ?? null;
  if (p.type === "multi_select") return p.multi_select[0]?.name ?? null;
  return null;
}

function getRichText(page: PageObjectResponse, name: string): string | null {
  const p = prop(page, name);
  if (!p || p.type !== "rich_text") return null;
  return p.rich_text.map((t) => t.plain_text).join("") || null;
}

function getNumber(page: PageObjectResponse, name: string): number | null {
  const p = prop(page, name);
  if (!p || p.type !== "number") return null;
  return p.number;
}

function getDateStart(page: PageObjectResponse, name: string): string | null {
  const p = prop(page, name);
  if (!p || p.type !== "date") return null;
  return p.date?.start ?? null;
}

function getPeopleNames(page: PageObjectResponse, name: string): string | null {
  const p = prop(page, name);
  if (!p || p.type !== "people") return null;
  const names = p.people
    .map((person) => ("name" in person ? person.name : null))
    .filter((n): n is string => Boolean(n));
  return names.length ? names.join(", ") : null;
}

function getOwner(page: PageObjectResponse, name: string): string | null {
  return getPeopleNames(page, name) ?? getRichText(page, name) ?? getSelectName(page, name);
}

function getPageUrl(page: PageObjectResponse): string | null {
  return page.url ?? null;
}

// ---- Public fetchers --------------------------------------------------

/**
 * Projects database expected schema (property names are configurable via
 * the *_PROP env vars in .env.example; defaults shown):
 *  - Name          (title)
 *  - Entity        (select)      — must match lib/config.ts ENTITIES[].notionValue
 *  - Status        (status/select) — free text, normalized via lib/status.ts
 *  - Phase         (select or rich_text), optional
 *  - % Complete    (number, 0-1 or 0-100), optional
 *  - Owner         (people or rich_text), optional
 *  - Next Milestone (date), optional
 */
export async function fetchProjects(): Promise<ProjectItem[]> {
  const databaseId = requireDatabaseId("NOTION_PROJECTS_DATABASE_ID");
  const pages = await queryAllPages(databaseId);

  return pages.map((page): ProjectItem => {
    const entityRaw = getSelectName(page, "Entity");
    const statusRaw = getSelectName(page, "Status");
    const percentRaw = getNumber(page, "% Complete");

    return {
      id: page.id,
      name: getTitleText(page, "Name") ?? "Untitled project",
      entityId: entityIdForNotionValue(entityRaw),
      entityName: entityNameForNotionValue(entityRaw),
      status: normalizeStatus(statusRaw),
      statusLabel: statusRaw ?? "Unknown",
      phase: getSelectName(page, "Phase") ?? getRichText(page, "Phase"),
      percentComplete:
        percentRaw === null ? null : percentRaw > 1 ? percentRaw : percentRaw * 100,
      owner: getOwner(page, "Owner"),
      nextMilestoneDate: getDateStart(page, "Next Milestone"),
      notionUrl: getPageUrl(page),
    };
  });
}

/**
 * Release Calendar database expected schema:
 *  - Name    (title)
 *  - Entity  (select)
 *  - Date    (date)
 *  - Type    (select), optional — e.g. "Release", "Launch", "Key Date"
 */
export async function fetchCalendar(): Promise<CalendarItem[]> {
  const databaseId = requireDatabaseId("NOTION_CALENDAR_DATABASE_ID");
  const pages = await queryAllPages(databaseId, {
    sorts: [{ property: "Date", direction: "ascending" }],
  });

  return pages
    .map((page): CalendarItem | null => {
      const date = getDateStart(page, "Date");
      if (!date) return null;
      const entityRaw = getSelectName(page, "Entity");
      return {
        id: page.id,
        title: getTitleText(page, "Name") ?? "Untitled event",
        entityId: entityIdForNotionValue(entityRaw),
        entityName: entityNameForNotionValue(entityRaw),
        date,
        type: getSelectName(page, "Type"),
        notionUrl: getPageUrl(page),
      };
    })
    .filter((item): item is CalendarItem => item !== null);
}

/**
 * Financials database expected schema:
 *  - Entity    (title or select) — matched against ENTITIES[].notionValue
 *  - Revenue   (number)
 *  - Period    (date or rich_text), optional — e.g. "2026 Q3"
 *  - Currency  (rich_text or select), optional — defaults to "USD"
 *
 * This database is entirely optional. If NOTION_FINANCIALS_DATABASE_ID is
 * unset, the panel shows "No financial data connected" instead of erroring.
 */
export async function fetchFinancials(): Promise<FinancialItem[]> {
  const databaseId = process.env.NOTION_FINANCIALS_DATABASE_ID;
  if (!databaseId) return [];

  const pages = await queryAllPages(databaseId);

  return pages
    .map((page): FinancialItem | null => {
      const entityRaw = getTitleText(page, "Entity") ?? getSelectName(page, "Entity");
      const revenue = getNumber(page, "Revenue");
      if (revenue === null) return null;
      return {
        entityId: entityIdForNotionValue(entityRaw),
        entityName: entityNameForNotionValue(entityRaw),
        revenue,
        period: getDateStart(page, "Period") ?? getRichText(page, "Period"),
        currency: getRichText(page, "Currency") ?? getSelectName(page, "Currency") ?? "USD",
      };
    })
    .filter((item): item is FinancialItem => item !== null);
}

/**
 * Team & AI-Agent Activity database expected schema:
 *  - Name               (title) — e.g. "Chad", "Claude", "Dispatch"
 *  - Role                (rich_text or select), optional
 *  - Status              (status/select), optional
 *  - Current Assignment  (rich_text), optional
 *  - Entity              (select), optional
 *
 * This database is entirely optional. If NOTION_TEAM_DATABASE_ID is unset,
 * the panel renders a placeholder describing the schema needed to light it
 * up, per AI_TEAM_ROSTER in lib/config.ts.
 */
export async function fetchTeamActivity(): Promise<TeamActivityItem[]> {
  const databaseId = process.env.NOTION_TEAM_DATABASE_ID;
  if (!databaseId) return [];

  const pages = await queryAllPages(databaseId);

  return pages.map((page): TeamActivityItem => {
    const statusRaw = getSelectName(page, "Status");
    const entityRaw = getSelectName(page, "Entity");
    return {
      id: page.id,
      name: getTitleText(page, "Name") ?? "Unnamed",
      role: getRichText(page, "Role") ?? getSelectName(page, "Role"),
      status: normalizeStatus(statusRaw),
      statusLabel: statusRaw ?? "Unknown",
      currentAssignment: getRichText(page, "Current Assignment"),
      entityName: entityRaw ? entityNameForNotionValue(entityRaw) : null,
      notionUrl: getPageUrl(page),
    };
  });
}
