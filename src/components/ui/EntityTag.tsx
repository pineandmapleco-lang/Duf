import { ENTITIES, type EntityId } from '../../types/dashboard'

export function EntityTag({ entity, className = '' }: { entity: EntityId; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-mp-border bg-mp-bg-raised px-2 py-0.5 text-[11px] font-medium tracking-wide text-mp-text-muted uppercase ${className}`}
    >
      {ENTITIES[entity].shortName}
    </span>
  )
}
