import { useMemo } from 'react'
import { useDashboard } from '../../context/DashboardContext'
import { SectionShell } from '../ui/SectionShell'
import { Panel } from '../ui/Panel'
import { MiniDonut } from '../ui/MiniDonut'
import { EntityTag } from '../ui/EntityTag'
import { LoadingBlock } from '../ui/LoadingBlock'
import { EmptyState } from '../ui/EmptyState'
import { buildTodaysActionItems, buildTomorrowPreview } from '../../lib/action-items'
import { formatTime12h } from '../../lib/format'
import type { ActionItem, ActionItemSource } from '../../types/dashboard'

const SOURCE_LABEL: Record<ActionItemSource, string> = {
  notion: 'Notion',
  calendar: 'Calendar',
  gmail: 'Gmail',
}

function ActionRow({ item, onToggle, isPreview = false }: { item: ActionItem; onToggle?: (id: string) => void; isPreview?: boolean }) {
  return (
    <li>
      <Panel
        className={`flex items-start gap-3 px-4 py-3 transition-colors ${
          item.overdue ? 'border-l-2 !border-l-mp-status-bad' : ''
        } ${item.completed ? 'opacity-60' : ''}`}
      >
        <button
          type="button"
          role="checkbox"
          aria-checked={item.completed}
          aria-label={item.completed ? `Mark "${item.title}" incomplete` : `Mark "${item.title}" complete`}
          disabled={isPreview}
          onClick={() => onToggle?.(item.id)}
          className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md border transition-colors ${
            item.completed
              ? 'border-mp-accent bg-mp-accent text-mp-bg'
              : 'border-mp-border bg-mp-bg-raised text-transparent hover:border-mp-accent-border'
          } ${isPreview ? 'cursor-default opacity-50' : 'cursor-pointer'}`}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </button>

        <div className="min-w-0 flex-1">
          <p className={`text-sm font-medium text-mp-text ${item.completed ? 'line-through' : ''}`}>{item.title}</p>
          {item.detail && <p className="mt-0.5 truncate text-xs text-mp-text-muted">{item.detail}</p>}
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <EntityTag entity={item.entity} />
            <span className="inline-flex items-center rounded-md border border-mp-border-soft px-2 py-0.5 text-[11px] text-mp-text-faint">
              {SOURCE_LABEL[item.source]}
            </span>
            {item.overdue && (
              <span className="inline-flex items-center gap-1 rounded-md border border-mp-status-bad-border bg-mp-status-bad-bg px-2 py-0.5 text-[11px] font-medium text-mp-status-bad">
                Overdue
              </span>
            )}
            {item.dueTime && (
              <span className="inline-flex items-center rounded-md border border-mp-border-soft px-2 py-0.5 text-[11px] font-mono text-mp-text-muted">
                {formatTime12h(item.dueTime)}
              </span>
            )}
            {isPreview && (
              <span className="inline-flex items-center rounded-md border border-mp-accent-border bg-mp-accent-bg px-2 py-0.5 text-[11px] font-medium text-mp-accent">
                Tomorrow
              </span>
            )}
          </div>
        </div>
      </Panel>
    </li>
  )
}

export function ActionItemsSection() {
  const { data, loading, lastUpdated, completedTaskIds, toggleTaskComplete } = useDashboard()

  const items = useMemo(() => {
    if (!data) return []
    return buildTodaysActionItems(data.notionTasks, data.calendarEvents, data.flaggedThreads, completedTaskIds)
  }, [data, completedTaskIds])

  const preview = useMemo(() => {
    if (!data) return []
    const pendingToday = items.filter((i) => !i.completed)
    if (pendingToday.length > 0) return []
    return buildTomorrowPreview(data.notionTasks)
  }, [data, items])

  const pendingCount = items.filter((i) => !i.completed).length

  const donutSlices = useMemo(
    () => [
      {
        key: 'overdue',
        label: 'Overdue',
        value: items.filter((i) => i.overdue).length,
        color: '#f87171',
        dotClassName: 'bg-mp-status-bad',
      },
      {
        key: 'today',
        label: 'Due today',
        value: items.filter((i) => !i.overdue).length,
        color: '#5eead4',
        dotClassName: 'bg-mp-accent',
      },
    ],
    [items],
  )

  return (
    <SectionShell
      id="action-items"
      title="Today's Action Items"
      description="Merged from Notion tasks, Calendar events, and flagged Gmail threads."
      lastUpdated={lastUpdated}
      actions={
        !loading && (
          <span className="text-xs font-medium text-mp-text-muted">
            {pendingCount} open
          </span>
        )
      }
    >
      {loading && !data ? (
        <LoadingBlock rows={4} label="Loading today's action items" />
      ) : items.length === 0 ? (
        <EmptyState title="Nothing due today." description="Nothing on the board for today — here's a head start on tomorrow.">
          {preview.length > 0 && (
            <ul className="space-y-2.5 text-left">
              {preview.map((item) => (
                <ActionRow key={item.id} item={item} isPreview />
              ))}
            </ul>
          )}
        </EmptyState>
      ) : (
        <>
          <Panel className="mb-4 w-fit p-4">
            <MiniDonut slices={donutSlices} centerLabel="Today's split" />
          </Panel>
          <ul className="space-y-2.5">
            {items.map((item) => (
              <ActionRow key={item.id} item={item} onToggle={toggleTaskComplete} />
            ))}
          </ul>
          {pendingCount === 0 && preview.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-mp-text-faint">
                All done for today — up next tomorrow
              </p>
              <ul className="space-y-2.5">
                {preview.map((item) => (
                  <ActionRow key={item.id} item={item} isPreview />
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </SectionShell>
  )
}
