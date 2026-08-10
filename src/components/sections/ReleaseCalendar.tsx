import { useMemo, useState } from 'react'
import { useDashboard } from '../../context/DashboardContext'
import { SectionShell } from '../ui/SectionShell'
import { Panel } from '../ui/Panel'
import { EntityTag } from '../ui/EntityTag'
import { LoadingBlock } from '../ui/LoadingBlock'
import { EmptyState } from '../ui/EmptyState'
import { formatWeekdayMonthDay } from '../../lib/format'
import type { ReleaseCalendarItem } from '../../types/dashboard'

const KIND_META: Record<ReleaseCalendarItem['kind'], { label: string; icon: string }> = {
  release: { label: 'Release', icon: '🚀' },
  marketing: { label: 'Marketing beat', icon: '📣' },
  ritual: { label: 'Seasonal ritual', icon: '🍂' },
  deadline: { label: 'Deadline', icon: '⏱️' },
}

function DAYS_OUT(dateStr: string): number {
  const target = new Date(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  target.setHours(0, 0, 0, 0)
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

export function ReleaseCalendarSection() {
  const { data, loading, lastUpdated } = useDashboard()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const upcoming = useMemo(() => {
    if (!data) return []
    return data.releaseCalendar
      .filter((item) => {
        const days = DAYS_OUT(item.date)
        return days >= 0 && days <= 60
      })
      .sort((a, b) => a.date.localeCompare(b.date))
  }, [data])

  return (
    <SectionShell
      id="calendar"
      title="Release & Ritual Calendar"
      description="Next 60 days of releases, marketing beats, and seasonal dates."
      lastUpdated={lastUpdated}
    >
      {loading && !data ? (
        <LoadingBlock rows={2} label="Loading release calendar" />
      ) : upcoming.length === 0 ? (
        <EmptyState title="Nothing scheduled in the next 60 days" description="The release calendar is clear for now." />
      ) : (
        <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          <div className="flex gap-3" style={{ minWidth: 'max-content' }}>
            {upcoming.map((item) => {
              const expanded = expandedId === item.id
              const kind = KIND_META[item.kind]
              const daysOut = DAYS_OUT(item.date)
              return (
                <Panel
                  key={item.id}
                  as="article"
                  className={`w-64 flex-none cursor-pointer p-4 transition-colors hover:border-mp-accent-border ${
                    expanded ? 'border-mp-accent-border' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedId(expanded ? null : item.id)}
                    aria-expanded={expanded}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-mp-text-muted">{formatWeekdayMonthDay(item.date)}</span>
                      <span className="text-[11px] text-mp-text-faint">
                        {daysOut === 0 ? 'Today' : `${daysOut}d`}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-semibold leading-snug text-mp-text">{item.title}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 rounded-md border border-mp-border-soft px-2 py-0.5 text-[11px] text-mp-text-muted">
                        <span aria-hidden="true">{kind.icon}</span>
                        {kind.label}
                      </span>
                      <EntityTag entity={item.entity} />
                    </div>
                    {expanded && <p className="mt-3 text-xs text-mp-text-muted">{item.detail}</p>}
                  </button>
                </Panel>
              )
            })}
          </div>
        </div>
      )}
    </SectionShell>
  )
}
