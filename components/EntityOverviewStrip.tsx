import { PanelError, PanelLoading } from "@/components/shared/PanelStates";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { EntitySummary } from "@/lib/types";

function formatDeadline(deadline: EntitySummary["nextDeadline"]): string {
  if (!deadline) return "No upcoming deadline";
  const date = new Date(deadline.date);
  const days = Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const dateLabel = date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  const relative = days <= 0 ? "today" : days === 1 ? "in 1 day" : `in ${days} days`;
  return `${dateLabel} · ${deadline.label} (${relative})`;
}

export function EntityOverviewStrip({
  data,
  error,
  loading,
}: {
  data: EntitySummary[] | null;
  error: string | null;
  loading: boolean;
}) {
  if (loading && !data) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-base-700 bg-base-900/60 p-4">
            <PanelLoading rows={2} />
          </div>
        ))}
      </div>
    );
  }

  if (error && !data) {
    return <PanelError message={error} />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {(data ?? []).map((entity) => (
        <div
          key={entity.id}
          className="group rounded-xl border border-base-700 bg-base-900/60 p-4 shadow-panel transition-colors hover:border-base-500 animate-fadeIn"
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-white">{entity.name}</h3>
            <StatusBadge status={entity.status} />
          </div>
          <p className="mt-3 text-2xl font-semibold text-white">
            {entity.activeProjectCount}
            <span className="ml-1.5 text-xs font-normal text-base-500">active</span>
          </p>
          <p className="mt-2 truncate text-xs text-base-500" title={formatDeadline(entity.nextDeadline)}>
            {formatDeadline(entity.nextDeadline)}
          </p>
        </div>
      ))}
    </div>
  );
}
