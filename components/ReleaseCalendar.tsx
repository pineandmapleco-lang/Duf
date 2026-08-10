import { PanelCard } from "@/components/shared/PanelCard";
import { PanelEmpty, PanelError, PanelLoading } from "@/components/shared/PanelStates";
import type { CalendarItem } from "@/lib/types";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function daysFromNow(iso: string): number {
  return Math.ceil((new Date(iso).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

export function ReleaseCalendar({
  data,
  error,
  loading,
}: {
  data: CalendarItem[] | null;
  error: string | null;
  loading: boolean;
}) {
  const upcoming = (data ?? [])
    .filter((item) => new Date(item.date).getTime() >= Date.now() - SEVEN_DAYS_MS)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <PanelCard title="Release Calendar">
      {loading && !data && <PanelLoading rows={4} />}
      {error && !data && <PanelError message={error} />}
      {data && upcoming.length === 0 && (
        <PanelEmpty
          title="No upcoming dates"
          hint="No releases, launches, or key dates found in the connected Release Calendar database."
        />
      )}

      {upcoming.length > 0 && (
        <ol className="space-y-2">
          {upcoming.map((item) => {
            const days = daysFromNow(item.date);
            const isSoon = days <= 7 && days >= 0;
            const isPast = days < 0;
            return (
              <li
                key={item.id}
                className={`flex items-center justify-between gap-3 rounded-lg border px-3.5 py-2.5 transition-colors animate-fadeIn ${
                  isSoon
                    ? "border-accent-amber/40 bg-accent-amber/10"
                    : "border-base-700 bg-base-850/60"
                } ${isPast ? "opacity-60" : ""}`}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{item.title}</p>
                  <p className="text-xs text-base-500">
                    {item.entityName}
                    {item.type ? ` · ${item.type}` : ""}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-medium text-white">
                    {new Date(item.date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className={`text-xs ${isSoon ? "text-accent-amber" : "text-base-500"}`}>
                    {isPast
                      ? "Past"
                      : days === 0
                      ? "Today"
                      : days === 1
                      ? "Tomorrow"
                      : `in ${days} days`}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </PanelCard>
  );
}
