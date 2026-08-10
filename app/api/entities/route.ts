import { withApiResult } from "@/lib/api-helpers";
import { ENTITIES } from "@/lib/config";
import { fetchCalendar, fetchProjects } from "@/lib/notion";
import { aggregateStatus } from "@/lib/status";
import type { EntitySummary } from "@/lib/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Derives the Entity Overview Strip summaries from the Projects and Release
 * Calendar databases — no separate "Entities" database is required. Active
 * project count = projects not in a "blocked"-free complete/done state;
 * next deadline = earliest upcoming date across that entity's project
 * milestones and calendar events.
 */
async function loadEntitySummaries(): Promise<EntitySummary[]> {
  const [projects, calendar] = await Promise.all([fetchProjects(), fetchCalendar()]);
  const now = Date.now();

  return ENTITIES.map((entity): EntitySummary => {
    const entityProjects = projects.filter((p) => p.entityId === entity.id);
    const activeProjects = entityProjects.filter(
      (p) => !["shipped", "done", "complete"].some((k) => p.statusLabel.toLowerCase().includes(k))
    );

    const upcomingDates = [
      ...entityProjects
        .filter((p) => p.nextMilestoneDate)
        .map((p) => ({ label: p.name, date: p.nextMilestoneDate as string })),
      ...calendar
        .filter((c) => c.entityId === entity.id)
        .map((c) => ({ label: c.title, date: c.date })),
    ]
      .filter((d) => new Date(d.date).getTime() >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return {
      id: entity.id,
      name: entity.name,
      activeProjectCount: activeProjects.length,
      nextDeadline: upcomingDates[0] ?? null,
      status: aggregateStatus(activeProjects.map((p) => p.status)),
    };
  });
}

export async function GET() {
  return withApiResult(loadEntitySummaries);
}
