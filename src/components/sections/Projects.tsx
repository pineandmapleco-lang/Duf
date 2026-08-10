import { useMemo, useState } from 'react'
import { useDashboard } from '../../context/DashboardContext'
import { SectionShell } from '../ui/SectionShell'
import { Panel } from '../ui/Panel'
import { StatusBadge } from '../ui/StatusBadge'
import { EntityTag } from '../ui/EntityTag'
import { LoadingBlock } from '../ui/LoadingBlock'
import { EmptyState } from '../ui/EmptyState'
import { formatMonthDay } from '../../lib/format'
import { ENTITIES, type EntityId } from '../../types/dashboard'

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
                <Panel key={project.id} as="article" className="flex flex-col gap-3 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-mp-text">{project.name}</h3>
                    <StatusBadge status={project.status} />
                  </div>
                  <EntityTag entity={project.entity} className="w-fit" />
                  <p className="text-xs text-mp-text-muted">{project.summary}</p>
                  <div className="text-xs text-mp-text-faint">
                    <span className="font-medium text-mp-text-muted">Phase:</span> {project.phase}
                  </div>
                  <div className="text-xs text-mp-text-faint">
                    <span className="font-medium text-mp-text-muted">Next:</span> {project.nextMilestone} —{' '}
                    {formatMonthDay(project.nextMilestoneDate)}
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-[11px] text-mp-text-faint">
                      <span>Progress</span>
                      <span>{project.percentComplete}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-mp-bg-raised">
                      <div
                        className="h-full rounded-full bg-mp-accent"
                        style={{ width: `${project.percentComplete}%` }}
                      />
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
