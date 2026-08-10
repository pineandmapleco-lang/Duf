import type { StatusLevel } from "./types";

/**
 * Single source of truth for status → color/label mapping. Every panel
 * (entity cards, project board, calendar highlights, team activity) imports
 * this instead of hard-coding colors, so the semantics stay consistent
 * across the dashboard.
 */
export const STATUS_META: Record<
  StatusLevel,
  { label: string; dot: string; text: string; bg: string; border: string }
> = {
  "on-track": {
    label: "On Track",
    dot: "bg-status-ontrack",
    text: "text-status-ontrack",
    bg: "bg-status-ontrack/10",
    border: "border-status-ontrack/30",
  },
  "at-risk": {
    label: "At Risk",
    dot: "bg-status-atrisk",
    text: "text-status-atrisk",
    bg: "bg-status-atrisk/10",
    border: "border-status-atrisk/30",
  },
  blocked: {
    label: "Blocked",
    dot: "bg-status-blocked",
    text: "text-status-blocked",
    bg: "bg-status-blocked/10",
    border: "border-status-blocked/30",
  },
  unknown: {
    label: "Unknown",
    dot: "bg-status-unknown",
    text: "text-status-unknown",
    bg: "bg-status-unknown/10",
    border: "border-status-unknown/30",
  },
};

/**
 * Normalizes free-text Notion status/select values into one of the four
 * canonical dashboard status levels. Extend the keyword lists here if your
 * OmniStack workspace uses different wording (e.g. "Stalled", "Shipped").
 */
export function normalizeStatus(raw: string | null | undefined): StatusLevel {
  if (!raw) return "unknown";
  const v = raw.trim().toLowerCase();

  if (["blocked", "stalled", "on hold", "paused", "stuck"].some((k) => v.includes(k))) {
    return "blocked";
  }
  if (
    ["at risk", "at-risk", "risk", "delayed", "behind", "attention"].some((k) =>
      v.includes(k)
    )
  ) {
    return "at-risk";
  }
  if (
    [
      "on track",
      "on-track",
      "active",
      "in progress",
      "complete",
      "done",
      "shipped",
      "live",
      "launched",
      "planned",
      "scheduled",
    ].some((k) => v.includes(k))
  ) {
    return "on-track";
  }
  return "unknown";
}

/** Derives an aggregate entity-level status from its projects' statuses. */
export function aggregateStatus(statuses: StatusLevel[]): StatusLevel {
  if (statuses.length === 0) return "unknown";
  if (statuses.includes("blocked")) return "blocked";
  if (statuses.includes("at-risk")) return "at-risk";
  if (statuses.every((s) => s === "unknown")) return "unknown";
  return "on-track";
}
