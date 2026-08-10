import { useDashboard } from '../../context/DashboardContext'
import { SectionShell } from '../ui/SectionShell'
import { Panel } from '../ui/Panel'
import { EntityTag } from '../ui/EntityTag'
import { LoadingBlock } from '../ui/LoadingBlock'
import { EmptyState } from '../ui/EmptyState'
import { formatRelativeTime } from '../../lib/format'

export function FilesCommsSection() {
  const { data, loading, lastUpdated } = useDashboard()

  return (
    <SectionShell
      id="pulse"
      title="Files & Comms Pulse"
      description="Peripheral awareness — recent Drive activity and threads waiting on a reply."
      lastUpdated={lastUpdated}
    >
      {loading && !data ? (
        <LoadingBlock rows={3} label="Loading files and comms" />
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Panel className="p-4">
            <h3 className="mb-3 text-sm font-semibold text-mp-text">Recently modified files</h3>
            {!data || data.driveFiles.length === 0 ? (
              <EmptyState title="No recent file activity" />
            ) : (
              <ul className="space-y-2">
                {data.driveFiles.slice(0, 6).map((file) => (
                  <li key={file.id}>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between gap-3 rounded-lg border border-mp-border-soft bg-mp-bg-raised px-3 py-2 transition-colors hover:border-mp-accent-border"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-mp-text">{file.name}</p>
                        <p className="mt-0.5 text-[11px] text-mp-text-faint">
                          {file.modifiedBy} · {formatRelativeTime(file.modifiedTime)}
                        </p>
                      </div>
                      <EntityTag entity={file.entity} className="flex-none" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel className="p-4">
            <h3 className="mb-3 text-sm font-semibold text-mp-text">Threads needing a reply</h3>
            {!data || data.flaggedThreads.length === 0 ? (
              <EmptyState title="Inbox is clear" description="No flagged threads right now." />
            ) : (
              <ul className="space-y-2">
                {data.flaggedThreads.slice(0, 6).map((thread) => (
                  <li key={thread.id}>
                    <a
                      href={thread.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-lg border border-mp-border-soft bg-mp-bg-raised px-3 py-2 transition-colors hover:border-mp-accent-border"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-xs font-medium text-mp-text">{thread.subject}</p>
                        {thread.entity && <EntityTag entity={thread.entity} className="flex-none" />}
                      </div>
                      <p className="mt-0.5 truncate text-[11px] text-mp-text-muted">
                        {thread.sender} · {formatRelativeTime(thread.receivedTime)}
                      </p>
                      <p className="mt-1 truncate text-[11px] text-mp-text-faint">{thread.snippet}</p>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      )}
    </SectionShell>
  )
}
