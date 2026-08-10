export type EntityId =
  | "wiseminds-studios"
  | "black-goat-wood-works"
  | "element-no-34"
  | "maddy-made-them"
  | "eats-and-treats";

export interface EntityDef {
  id: EntityId;
  name: string;
  /** Value expected in the Notion "Entity" select/multi-select property for this entity. */
  notionValue: string;
}

export type StatusLevel = "on-track" | "at-risk" | "blocked" | "unknown";

export interface EntitySummary {
  id: EntityId;
  name: string;
  activeProjectCount: number;
  nextDeadline: { label: string; date: string } | null;
  status: StatusLevel;
}

export interface ProjectItem {
  id: string;
  name: string;
  entityId: EntityId | null;
  entityName: string;
  status: StatusLevel;
  statusLabel: string;
  phase: string | null;
  percentComplete: number | null;
  owner: string | null;
  nextMilestoneDate: string | null;
  notionUrl: string | null;
}

export interface CalendarItem {
  id: string;
  title: string;
  entityId: EntityId | null;
  entityName: string;
  date: string;
  type: string | null;
  notionUrl: string | null;
}

export interface FinancialItem {
  entityId: EntityId | null;
  entityName: string;
  revenue: number;
  period: string | null;
  currency: string | null;
}

export interface TeamActivityItem {
  id: string;
  name: string;
  role: string | null;
  status: StatusLevel;
  statusLabel: string;
  currentAssignment: string | null;
  entityName: string | null;
  notionUrl: string | null;
}

/** Uniform server-side response envelope so the client never has to guess a shape. */
export type ApiResult<T> =
  | { ok: true; data: T; fetchedAt: string }
  | { ok: false; error: string; fetchedAt: string };
