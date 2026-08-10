import { PanelCard } from "@/components/shared/PanelCard";
import { PanelError, PanelLoading } from "@/components/shared/PanelStates";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { AI_TEAM_ROSTER } from "@/lib/config";
import type { TeamActivityItem } from "@/lib/types";

export function TeamActivityPanel({
  data,
  error,
  loading,
}: {
  data: TeamActivityItem[] | null;
  error: string | null;
  loading: boolean;
}) {
  const items = data ?? [];
  const byName = new Map(items.map((i) => [i.name.toLowerCase(), i]));

  return (
    <PanelCard title="Team & AI-Agent Activity">
      {loading && !data && <PanelLoading rows={4} />}
      {error && !data && <PanelError message={error} />}

      {data && items.length === 0 && (
        <div className="rounded-lg border border-dashed border-base-600 p-4">
          <p className="text-sm font-medium text-base-500">
            No structured activity data connected yet
          </p>
          <p className="mt-1 text-xs text-base-500/80">
            Set <code className="rounded bg-base-800 px-1 py-0.5">NOTION_TEAM_DATABASE_ID</code> in
            .env to a Notion database with these properties to populate this panel: <code className="rounded bg-base-800 px-1 py-0.5">Name</code> (title),{" "}
            <code className="rounded bg-base-800 px-1 py-0.5">Role</code> (text/select),{" "}
            <code className="rounded bg-base-800 px-1 py-0.5">Status</code> (status/select),{" "}
            <code className="rounded bg-base-800 px-1 py-0.5">Current Assignment</code> (text),{" "}
            <code className="rounded bg-base-800 px-1 py-0.5">Entity</code> (select, optional).
          </p>
          <div className="mt-3.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {AI_TEAM_ROSTER.map((name) => (
              <div
                key={name}
                className="rounded-md border border-base-700 bg-base-850/60 px-2.5 py-2 text-center"
              >
                <p className="text-xs font-medium text-base-500">{name}</p>
                <p className="mt-0.5 text-[11px] text-base-500/60">No data</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {items.length > 0 && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {AI_TEAM_ROSTER.map((name) => {
            const item = byName.get(name.toLowerCase());
            return (
              <div
                key={name}
                className="rounded-lg border border-base-700 bg-base-850/60 p-3.5 animate-fadeIn"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-white">{name}</p>
                  {item ? (
                    <StatusBadge status={item.status} label={item.statusLabel} />
                  ) : (
                    <span className="text-xs text-base-500">No data</span>
                  )}
                </div>
                {item?.role && <p className="mt-1 text-xs text-base-500">{item.role}</p>}
                <p className="mt-2 text-xs text-base-500/90">
                  {item?.currentAssignment ?? "No assignment tracked in Notion."}
                </p>
              </div>
            );
          })}

          {items
            .filter((i) => !AI_TEAM_ROSTER.some((r) => r.toLowerCase() === i.name.toLowerCase()))
            .map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-base-700 bg-base-850/60 p-3.5 animate-fadeIn"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-white">{item.name}</p>
                  <StatusBadge status={item.status} label={item.statusLabel} />
                </div>
                {item.role && <p className="mt-1 text-xs text-base-500">{item.role}</p>}
                <p className="mt-2 text-xs text-base-500/90">
                  {item.currentAssignment ?? "No assignment tracked in Notion."}
                </p>
              </div>
            ))}
        </div>
      )}
    </PanelCard>
  );
}
