import { useMemo, useState, useRef } from 'react'
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

const WINDOW_DAYS = 60

function daysOut(dateStr: string): number {
  const target = new Date(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  target.setHours(0, 0, 0, 0)
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

function TimelineChart({
  items,
  expandedId,
  onSelect,
}: {
  items: ReleaseCalendarItem[]
  expandedId: string | null
  onSelect: (id: string) => void
}) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})

  return (
    <div className="mb-5 rounded-xl border border-mp-border bg-mp-panel p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_10px_24px_-12px_rgba(0,0,0,0.6)]">
      <div className="relative h-14">
        <div className="absolute left-0 right-0 top-6 h-px bg-mp-border" />
        <div
          className="absolute top-6 h-px bg-gradient-to-r from-mp-accent/60 to-mp-accent/0"
          style={{ left: 0, width: '2%' }}
        />
        {items.map((item) => {
          const pct = Math.min(100, Math.max(0, (daysOut(item.date) / WINDOW_DAYS) * 100))
          const active = expandedId === item.id
          return (
            <button
              key={item.id}
              ref={(el) => {
                refs.current[item.id] = el
              }}
              type="button"
              onClick={() => onSelect(item.id)}
              title={`${item.title} — ${formatWeekdayMonthDay(item.date)}`}
              aria-label={`${item.title}, ${formatWeekdayMonthDay(item.date)}`}
              aria-pressed={active}
              style={{ left: `${pct}%` }}
              className="group absolute top-2.5 -translate-x-1/2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mp-accent"
            >
              <span
                className={`block h-3 w-3 rounded-full border-2 transition-all ${
                  active
                    ? 'scale-125 border-mp-accent bg-mp-accent'
                    : 'border-mp-accent-border bg-mp-bg-raised group-hover:scale-110 group-hover:border-mp-accent'
                }`}
              />
            </button>
          )
        })}
      </div>
      <div className="flex justify-between text-[11px] text-mp-text-faint">
        <span>Today</span>
        <span>+30d</span>
        <span>+60d</span>
      </div>
    </div>
  )
}

export function ReleaseCalendarSection() {
  const { data, loading, lastUpdated } = useDashboard()
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const upcoming = useMemo(() => {
    if (!data) return []
    return data.releaseCalendar
      .filter((item) => {
        const days = daysOut(item.date)
        return days >= 0 && days <= WINDOW_DAYS
      })
      .sort((a, b) => a.date.localeCompare(b.date))
  }, [data])

  const handleSelect = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
    cardRefs.current[id]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

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
        <EmptyState
          title={data?.sourceErrors.releaseCalendar ? 'Could not load the release calendar' : 'Nothing scheduled in the next 60 days'}
          description={
            data?.sourceErrors.releaseCalendar
              ? `${data.sourceErrors.releaseCalendar} — check NOTION_API_KEY and NOTION_RELEASE_CALENDAR_DATA_SOURCE_ID, or set VITE_NOTION_MODE=mock.`
              : 'The release calendar is clear for now.'
          }
        />
      ) : (
        <>
          <TimelineChart items={upcoming} expandedId={expandedId} onSelect={handleSelect} />
          <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
            <div className="flex gap-3" style={{ minWidth: 'max-content' }}>
              {upcoming.map((item) => {
                const expanded = expandedId === item.id
                const kind = KIND_META[item.kind]
                const days = daysOut(item.date)
                return (
                  <Panel
                    key={item.id}
                    as="article"
                    hover
                    ref={(el: HTMLDivElement | null) => {
                      cardRefs.current[item.id] = el
                    }}
                    className={`w-64 flex-none cursor-pointer p-4 ${expanded ? '!border-mp-accent-border' : ''}`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelect(item.id)}
                      aria-expanded={expanded}
                      className="w-full text-left"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-mp-text-muted">{formatWeekdayMonthDay(item.date)}</span>
                        <span className="text-[11px] text-mp-text-faint">{days === 0 ? 'Today' : `${days}d`}</span>
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
        </>
      )}
    </SectionShell>
  )
}
