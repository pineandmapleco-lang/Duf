"use client";

import { useEffect, useState } from "react";

function formatSyncedAt(iso: string | null): string {
  if (!iso) return "Never synced";
  const date = new Date(iso);
  return `Last synced ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
}

export function Header({
  connectionOk,
  lastSyncedAt,
  isSyncing,
  onRefresh,
}: {
  connectionOk: boolean;
  lastSyncedAt: string | null;
  isSyncing: boolean;
  onRefresh: () => void;
}) {
  const [, forceTick] = useState(0);

  // Keep the "last synced" relative label fresh without re-fetching data.
  useEffect(() => {
    const id = setInterval(() => forceTick((n) => n + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 border-b border-base-700 bg-base-950/90 px-6 py-4 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-accent-teal/30 to-accent-amber/20 text-accent-teal">
          <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden="true">
            <path
              d="M12 2 4 12h4l-3 10 11-13h-5l4-7z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-base font-semibold tracking-tight text-white">
            Maple &amp; Pine Command Center
          </h1>
          <p className="text-xs text-base-500">Holding company operations overview</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs text-base-500">
          <span
            className={`h-2 w-2 rounded-full ${
              connectionOk ? "bg-status-ontrack" : "bg-status-blocked"
            } ${isSyncing ? "animate-pulseDot" : ""}`}
            aria-hidden="true"
          />
          <span>{connectionOk ? "Notion sync live" : "Notion sync degraded"}</span>
        </div>

        <span className="hidden text-xs text-base-500 sm:inline">
          {isSyncing ? "Syncing…" : formatSyncedAt(lastSyncedAt)}
        </span>

        <button
          type="button"
          onClick={onRefresh}
          disabled={isSyncing}
          className="inline-flex items-center gap-1.5 rounded-md border border-base-600 bg-base-800 px-3 py-1.5 text-xs font-medium text-base-500 transition-colors hover:border-accent-teal/50 hover:text-accent-teal disabled:cursor-not-allowed disabled:opacity-60"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin" : ""}`}
            aria-hidden="true"
          >
            <path
              d="M4 4v5h5M20 20v-5h-5M4.6 15a8 8 0 0 0 14.4 2.5M19.4 9A8 8 0 0 0 5 6.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Refresh
        </button>
      </div>
    </header>
  );
}
