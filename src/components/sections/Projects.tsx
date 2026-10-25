import { useMemo, useState } from 'react'
import { useDashboard } from '../../context/DashboardContext'
import { SectionShell } from '../ui/SectionShell'
import { Panel } from '../ui/Panel'
import { StatusBadge } from '../ui/StatusBadge'
import { StatusDonut } from '../ui/StatusDonut'
import { ProgressRing } from '../ui/ProgressRing'
import { EntityTag } from '../ui/EntityTag'
import { LoadingBlock } from '../ui/LoadingBlock'
import { EmptyState } from '../ui/EmptyState'
import { formatMonthDay } from '../../lib/format'
import { ENTITIES, type EntityId, type StatusLevel } from '../../types/dashboard'

export function ProjectsSection() {
  const { data, loading, lastUpdated } = useDashboard()
  const [filter, setFilter] = useState<EntityId | 'all'>('all')

  const entitiesInPlay = useMemo(() => {
    if (!data) return []
    return Array.from(new Set(data.projects.map((p) => p.entity)))
  }, [data])

  const filtered = useMemo(() => {
    if (!data) return []
    return filter === 'all' ? data.projects : data.projects.filter((p) => p.entity === filter)
  }, [data, filter])

  const statusCounts = useMemo(() => {
    const counts: Record<StatusLevel, number> = { good: 0, warn: 0, bad: 0 }
    for (const p of data?.projects ?? []) counts[p.status]++
    return counts
  }, [data])

  return (
    <SectionShell
      id="projects"
      title="Project & Release Status"
      description="One card per active project or IP across every entity."
      lastUpdated={lastUpdated}
    >
      {loading && !data ? (
        <LoadingBlock rows={4} label="Loading projects" />
      ) : !data || data.projects.length === 0 ? (
        <EmptyState title="No active projects" description="Nothing is currently tracked in the project pipeline." />
      ) : (
        <>
          <Panel className="mb-4 w-fit p-4">
            <StatusDonut counts={statusCounts} label="All projects" />
          </Panel>

          <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filter projects by entity">
            <button
              type="button"
              aria-pressed={filter === 'all'}
              onClick={() => setFilter('all')}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                filter === 'all'
                  ? 'border-mp-accent-border bg-mp-accent-bg text-mp-accent'
                  : 'border-mp-border text-mp-text-muted hover:text-mp-text'
              }`}
            >
              All entities
            </button>
            {entitiesInPlay.map((entity) => (
              <button
                key={entity}
                type="button"
                aria-pressed={filter === entity}
                onClick={() => setFilter(entity)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  filter === entity
                    ? 'border-mp-accent-border bg-mp-accent-bg text-mp-accent'
                    : 'border-mp-border text-mp-text-muted hover:text-mp-text'
                }`}
              >
                {ENTITIES[entity].shortName}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <EmptyState title="No projects for this entity" description="Try a different filter." />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((project) => (
                <Panel key={project.id} as="article" hover className="flex flex-col gap-3 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-mp-text">{project.name}</h3>
                    <StatusBadge status={project.status} />
                  </div>
                  <EntityTag entity={project.entity} className="w-fit" />
                  <p className="text-xs text-mp-text-muted">{project.summary}</p>
                  <div className="text-xs text-mp-text-faint">
                    <span className="font-medium text-mp-text-muted">Phase:</span> {project.phase}
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs text-mp-text-faint">
                      <span className="font-medium text-mp-text-muted">Next:</span> {project.nextMilestone} —{' '}
                      {formatMonthDay(project.nextMilestoneDate)}
                    </div>
                    <div className="relative flex-none">
                      <ProgressRing percent={project.percentComplete} />
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-mp-text tabular-nums">
                        {project.percentComplete}
                      </span>
                    </div>
                  </div>
                </Panel>
              ))}
            </div>
          )}
        </>
      )}
    </SectionShell>
  )
}
