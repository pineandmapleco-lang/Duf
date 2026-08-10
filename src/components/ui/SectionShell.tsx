import type { ReactNode } from 'react'
import { formatRelativeTime } from '../../lib/format'

interface SectionShellProps {
  id: string
  title: string
  description?: string
  lastUpdated?: string | null
  actions?: ReactNode
  children: ReactNode
  accent?: 'default' | 'gold'
}

export function SectionShell({ id, title, description, lastUpdated, actions, children, accent = 'default' }: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-24 animate-fade-in"
    >
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id={`${id}-heading`}
            className={`text-lg font-semibold tracking-tight sm:text-xl ${accent === 'gold' ? 'text-mp-gold-strong' : 'text-mp-text'}`}
          >
            {title}
          </h2>
          {description && <p className="mt-1 text-sm text-mp-text-muted">{description}</p>}
        </div>
        <div className="flex items-center gap-3">
          {actions}
          {lastUpdated && (
            <span className="text-xs text-mp-text-faint whitespace-nowrap">
              Updated {formatRelativeTime(lastUpdated)}
            </span>
          )}
        </div>
      </div>
      {children}
    </section>
  )
}
