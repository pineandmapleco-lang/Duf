"use client";

import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import type {
  ApiResult,
  CalendarItem,
  EntitySummary,
  FinancialItem,
  ProjectItem,
  TeamActivityItem,
} from "@/lib/types";

interface PanelState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

interface DashboardState {
  entities: PanelState<EntitySummary[]>;
  projects: PanelState<ProjectItem[]>;
  calendar: PanelState<CalendarItem[]>;
  financials: PanelState<FinancialItem[]>;
  team: PanelState<TeamActivityItem[]>;
  lastSyncedAt: string | null;
  isSyncing: boolean;
  connectionOk: boolean;
  refresh: () => void;
}

const ENDPOINTS = {
  entities: "/api/entities",
  projects: "/api/projects",
  calendar: "/api/calendar",
  financials: "/api/financials",
  team: "/api/team",
} as const;

type PanelKey = keyof typeof ENDPOINTS;

function initialPanelState<T>(): PanelState<T> {
  return { data: null, error: null, loading: true };
}

async function fetchPanel<T>(url: string, signal: AbortSignal): Promise<ApiResult<T>> {
  const res = await fetch(url, { signal, cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Request to ${url} failed with status ${res.status}`);
  }
  return (await res.json()) as ApiResult<T>;
}

/**
 * Drives every dashboard panel from a single coordinated fetch cycle: one
 * poll interval, one manual-refresh button, and a re-entrancy guard so a
 * slow cycle never overlaps the next tick or a manual click mid-flight.
 */
export function useDashboardData(refreshIntervalMs: number): DashboardState {
  const [entities, setEntities] = useState(initialPanelState<EntitySummary[]>());
  const [projects, setProjects] = useState(initialPanelState<ProjectItem[]>());
  const [calendar, setCalendar] = useState(initialPanelState<CalendarItem[]>());
  const [financials, setFinancials] = useState(initialPanelState<FinancialItem[]>());
  const [team, setTeam] = useState(initialPanelState<TeamActivityItem[]>());
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // A new cycle cancels whatever's in flight rather than being blocked by
  // it — a plain "skip if in-flight" guard can permanently wedge the
  // dashboard in its loading state if an earlier cycle is aborted (e.g.
  // React 18 Strict Mode's mount → cleanup → remount in development)
  // before it gets a chance to clear the flag. cycleIdRef ensures only the
  // most recent cycle is allowed to write the shared lastSyncedAt/isSyncing
  // state, so a stale, aborted cycle can never overwrite a newer one.
  const abortRef = useRef<AbortController | null>(null);
  const cycleIdRef = useRef(0);

  const setters: Record<PanelKey, Dispatch<SetStateAction<PanelState<any>>>> = {
    entities: setEntities,
    projects: setProjects,
    calendar: setCalendar,
    financials: setFinancials,
    team: setTeam,
  };

  const runCycle = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const cycleId = ++cycleIdRef.current;

    setIsSyncing(true);

    await Promise.all(
      (Object.keys(ENDPOINTS) as PanelKey[]).map(async (key) => {
        const setState = setters[key];
        try {
          const result = await fetchPanel(ENDPOINTS[key], controller.signal);
          if (controller.signal.aborted) return;
          if (result.ok) {
            setState({ data: result.data, error: null, loading: false });
          } else {
            setState((prev: PanelState<any>) => ({
              data: prev?.data ?? null,
              error: result.error,
              loading: false,
            }));
          }
        } catch (err) {
          if (controller.signal.aborted) return;
          const message = err instanceof Error ? err.message : "Network error";
          setState((prev: PanelState<any>) => ({
            data: prev?.data ?? null,
            error: message,
            loading: false,
          }));
        }
      })
    );

    if (cycleId === cycleIdRef.current) {
      setLastSyncedAt(new Date().toISOString());
      setIsSyncing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refresh = useCallback(() => {
    void runCycle();
  }, [runCycle]);

  useEffect(() => {
    void runCycle();
    const interval = setInterval(() => void runCycle(), refreshIntervalMs);
    return () => {
      clearInterval(interval);
      abortRef.current?.abort();
    };
  }, [runCycle, refreshIntervalMs]);

  const connectionOk =
    lastSyncedAt !== null &&
    !entities.error &&
    !projects.error &&
    !calendar.error &&
    !financials.error &&
    !team.error;

  return {
    entities,
    projects,
    calendar,
    financials,
    team,
    lastSyncedAt,
    isSyncing,
    connectionOk,
    refresh,
  };
}
