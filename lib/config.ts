import type { EntityDef } from "./types";

/**
 * The five holding-company entities. `notionValue` is the exact text this
 * app expects to find in the "Entity" select/multi-select property of the
 * Projects, Release Calendar, Financials, and (optionally) Team Notion
 * databases. Edit `notionValue` if your OmniStack workspace uses different
 * labels — everything else derives from this list.
 */
export const ENTITIES: EntityDef[] = [
  { id: "wiseminds-studios", name: "WiseMinds Studios", notionValue: "WiseMinds Studios" },
  { id: "black-goat-wood-works", name: "Black Goat Wood Works", notionValue: "Black Goat Wood Works" },
  { id: "element-no-34", name: "Element No.34", notionValue: "Element No.34" },
  { id: "maddy-made-them", name: "Maddy Made Them", notionValue: "Maddy Made Them" },
  { id: "eats-and-treats", name: "Eats & Treats", notionValue: "Eats & Treats" },
];

export function entityIdForNotionValue(value: string | null | undefined) {
  if (!value) return null;
  const match = ENTITIES.find(
    (e) => e.notionValue.toLowerCase() === value.toLowerCase()
  );
  return match?.id ?? null;
}

export function entityNameForNotionValue(value: string | null | undefined) {
  const id = entityIdForNotionValue(value);
  return ENTITIES.find((e) => e.id === id)?.name ?? value ?? "Unassigned";
}

/** AI-agent roster the Team & Activity panel looks for, in display order. */
export const AI_TEAM_ROSTER = [
  "Chad",
  "Claude",
  "Dispatch",
  "Codey",
  "Gem",
  "Manus",
  "Main AI Brain",
];

export const DEFAULT_REFRESH_INTERVAL_MS = 5 * 60 * 1000;

export const MIN_REFRESH_INTERVAL_MS = 30 * 1000;

export function getRefreshIntervalMs(): number {
  const raw = process.env.NEXT_PUBLIC_REFRESH_INTERVAL_MS;
  const parsed = raw ? Number(raw) : NaN;
  if (!Number.isFinite(parsed) || parsed < MIN_REFRESH_INTERVAL_MS) {
    return DEFAULT_REFRESH_INTERVAL_MS;
  }
  return parsed;
}

/**
 * Quick Actions / footer links. Configure via NEXT_PUBLIC_QUICK_LINKS as a
 * JSON array of {"label": "...", "url": "..."} objects, or edit the
 * fallback list below directly.
 */
export interface QuickLink {
  label: string;
  url: string;
}

export function getQuickLinks(): QuickLink[] {
  const raw = process.env.NEXT_PUBLIC_QUICK_LINKS;
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (l): l is QuickLink =>
            typeof l?.label === "string" && typeof l?.url === "string"
        );
      }
    } catch {
      // fall through to default
    }
  }
  return [];
}
