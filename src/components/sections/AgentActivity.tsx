import { useMemo } from 'react'
import { useDashboard } from '../../context/DashboardContext'
import { SectionShell } from '../ui/SectionShell'
import { Panel } from '../ui/Panel'
import { StatusBadge } from '../ui/StatusBadge'
import { StatusDonut } from '../ui/StatusDonut'
import { LoadingBlock } from '../ui/LoadingBlock'
import { EmptyState } from '../ui/EmptyState'
import { formatRelativeTime } from '../../lib/format'
import { NOTION_LINKS } from '../../lib/data-sources/notion'
import type { StatusLevel } from '../../types/dashboard'

export function AgentActivitySection() {
  const { data, loading, lastUpdated } = useDashboard()

  const statusCounts = useMemo(() => {
    const counts: Record<StatusLevel, number> = { good: 0, warn: 0, bad: 0 }
    for (const a of data?.agents ?? []) counts[a.status]++
    return counts
  }, [data])

  return (
    <SectionShell
      id="agents"
      title="AI Agent Activity"
      description="Who's doing what right now — full history lives in Notion."
      lastUpdated={lastUpdated}
      actions={
        <a
          href={NOTION_LINKS.workspace}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-medium text-mp-accent hover:underline"
        >
          Full history in Notion →
        </a>
      }
    >
      {loading && !data ? (
        <LoadingBlock rows={4} label="Loading agent activity" />
      ) : !data || data.agents.length === 0 ? (
        <EmptyState
          title={data?.sourceErrors.agents ? 'Could not load agent activity' : 'No agent activity'}
          description={
            data?.sourceErrors.agents
              ? `${data.sourceErrors.agents} — check NOTION_API_KEY and NOTION_HANDOFF_LEDGER_DATA_SOURCE_ID, or set VITE_NOTION_MODE=mock.`
              : 'The AI team roster is currently empty.'
          }
        />
      ) : (
        <>
          <Panel className="mb-4 w-fit p-4">
            <StatusDonut counts={statusCounts} label="All agents" />
          </Panel>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {data.agents.map((agent) => (
            <Panel key={agent.id} as="article" hover className="flex flex-col gap-3 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-mp-text">{agent.name}</h3>
                  <p className="text-xs text-mp-text-faint">{agent.role}</p>
                </div>
                <StatusBadge status={agent.status} />
              </div>

              <p className="rounded-md bg-mp-bg-raised px-2.5 py-2 text-xs text-mp-text-muted">
                <span className="font-medium text-mp-text">Now: </span>
                {agent.currentAssignment}
              </p>

              <div className="space-y-1.5 text-[11px] text-mp-text-faint">
                <p>
                  <span className="font-medium text-mp-text-muted">Received from {agent.lastHandoffReceived.withWhom}: </span>
                  {agent.lastHandoffReceived.summary}
                  <span className="ml-1 text-mp-text-faint">· {formatRelativeTime(agent.lastHandoffReceived.time)}</span>
                </p>
                <p>
                  <span className="font-medium text-mp-text-muted">Sent to {agent.lastHandoffSent.withWhom}: </span>
                  {agent.lastHandoffSent.summary}
                  <span className="ml-1 text-mp-text-faint">· {formatRelativeTime(agent.lastHandoffSent.time)}</span>
                </p>
              </div>

              <a
                href={agent.notionUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-auto text-xs font-medium text-mp-accent hover:underline"
              >
                View full log →
              </a>
            </Panel>
          ))}
          </div>
        </>
      )}
    </SectionShell>
  )
}
