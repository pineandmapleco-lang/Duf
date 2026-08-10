"use client";

import { useMemo, useState } from "react";
import { PanelCard } from "@/components/shared/PanelCard";
import { PanelEmpty, PanelError, PanelLoading } from "@/components/shared/PanelStates";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ENTITIES } from "@/lib/config";
import type { ProjectItem, StatusLevel } from "@/lib/types";

type GroupMode = "entity" | "status";

const STATUS_ORDER: StatusLevel[] = ["blocked", "at-risk", "on-track", "unknown"];
const STATUS_LABELS: Record<StatusLevel, string> = {
  blocked: "Blocked",
  "at-risk": "At Risk",
  "on-track": "On Track",
  unknown: "Unknown",
};

function formatDate(iso: string | null): string {
  if (!iso) return "No date set";
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <a
      href={project.notionUrl ?? undefined}
      target={project.notionUrl ? "_blank" : undefined}
      rel={project.notionUrl ? "noreferrer" : undefined}
      className="block rounded-lg border border-base-700 bg-base-850/80 p-3.5 transition-colors hover:border-base-500 hover:bg-base-800/80"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-white">{project.name}</p>
        <StatusBadge status={project.status} label={project.statusLabel} />
      </div>
      <p className="mt-1 text-xs text-base-500">{project.entityName}</p>

      <div className="mt-3 flex items-center justify-between text-xs text-base-500">
        <span>{project.phase ?? "No phase set"}</span>
        <span>{project.owner ?? "Unassigned"}</span>
      </div>

      {project.percentComplete !== null && (
        <div className="mt-2.5">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-base-700">
            <div
              className="h-full rounded-full bg-accent-teal transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, project.percentComplete))}%` }}
            />
          </div>
        </div>
      )}

      <p className="mt-2.5 text-xs text-base-500">
        Next milestone: <span className="text-base-500/90">{formatDate(project.nextMilestoneDate)}</span>
      </p>
    </a>
  );
}

export function ProjectBoard({
  data,
  error,
  loading,
}: {
  data: ProjectItem[] | null;
  error: string | null;
  loading: boolean;
}) {
  const [groupMode, setGroupMode] = useState<GroupMode>("entity");
  const [search, setSearch] = useState("");
  const [entityFilter, setEntityFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = search.trim().toLowerCase();
    return data.filter((p) => {
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.owner ?? "").toLowerCase().includes(q) ||
        (p.phase ?? "").toLowerCase().includes(q);
      const matchesEntity = entityFilter === "all" || p.entityId === entityFilter;
      return matchesSearch && matchesEntity;
    });
  }, [data, search, entityFilter]);

  const groups = useMemo(() => {
    if (groupMode === "entity") {
      return ENTITIES.map((e) => ({
        key: e.id,
        label: e.name,
        items: filtered.filter((p) => p.entityId === e.id),
      })).filter((g) => g.items.length > 0);
    }
    return STATUS_ORDER.map((s) => ({
      key: s,
      label: STATUS_LABELS[s],
      items: filtered.filter((p) => p.status === s),
    })).filter((g) => g.items.length > 0);
  }, [filtered, groupMode]);

  const action = (
    <div className="flex items-center gap-1 rounded-md border border-base-600 bg-base-800 p-0.5 text-xs">
      {(["entity", "status"] as GroupMode[]).map((mode) => (
        <button
          key={mode}
          type="button"
          onClick={() => setGroupMode(mode)}
          className={`rounded px-2.5 py-1 font-medium transition-colors ${
            groupMode === mode ? "bg-base-700 text-white" : "text-base-500 hover:text-white"
          }`}
        >
          By {mode === "entity" ? "Entity" : "Status"}
        </button>
      ))}
    </div>
  );

  return (
    <PanelCard title="Project & Release Status" action={action}>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects, owners, phases…"
          className="w-full rounded-md border border-base-600 bg-base-800 px-3 py-1.5 text-sm text-white placeholder:text-base-500 focus:border-accent-teal/60 focus:outline-none sm:max-w-xs"
        />
        <select
          value={entityFilter}
          onChange={(e) => setEntityFilter(e.target.value)}
          className="w-full rounded-md border border-base-600 bg-base-800 px-3 py-1.5 text-sm text-white focus:border-accent-teal/60 focus:outline-none sm:w-auto"
        >
          <option value="all">All entities</option>
          {ENTITIES.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>
      </div>

      {loading && !data && <PanelLoading rows={4} />}
      {error && !data && <PanelError message={error} />}
      {data && groups.length === 0 && (
        <PanelEmpty
          title="No matching projects"
          hint={
            data.length === 0
              ? "No projects found in the connected Notion database yet."
              : "Try clearing the search or entity filter."
          }
        />
      )}

      <div className="space-y-6">
        {groups.map((group) => (
          <div key={group.key}>
            <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-base-500">
              {group.label}
              <span className="ml-2 text-base-500/60">{group.items.length}</span>
            </h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {group.items.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </PanelCard>
  );
}
