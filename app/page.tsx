"use client";

import { EntityOverviewStrip } from "@/components/EntityOverviewStrip";
import { FinancialsPanel } from "@/components/FinancialsPanel";
import { Header } from "@/components/Header";
import { ProjectBoard } from "@/components/ProjectBoard";
import { QuickLinksFooter } from "@/components/QuickLinksFooter";
import { ReleaseCalendar } from "@/components/ReleaseCalendar";
import { TeamActivityPanel } from "@/components/TeamActivityPanel";
import { getQuickLinks, getRefreshIntervalMs } from "@/lib/config";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function Home() {
  const refreshIntervalMs = getRefreshIntervalMs();
  const { entities, projects, calendar, financials, team, lastSyncedAt, isSyncing, connectionOk, refresh } =
    useDashboardData(refreshIntervalMs);
  const quickLinks = getQuickLinks();

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        connectionOk={connectionOk}
        lastSyncedAt={lastSyncedAt}
        isSyncing={isSyncing}
        onRefresh={refresh}
      />

      <main className="mx-auto flex w-full max-w-[1800px] flex-1 flex-col gap-6 px-6 py-6">
        <EntityOverviewStrip data={entities.data} error={entities.error} loading={entities.loading} />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <ProjectBoard data={projects.data} error={projects.error} loading={projects.loading} />
          </div>
          <div className="flex flex-col gap-6">
            <ReleaseCalendar data={calendar.data} error={calendar.error} loading={calendar.loading} />
            <FinancialsPanel data={financials.data} error={financials.error} loading={financials.loading} />
          </div>
        </div>

        <TeamActivityPanel data={team.data} error={team.error} loading={team.loading} />
      </main>

      <QuickLinksFooter links={quickLinks} />
    </div>
  );
}
