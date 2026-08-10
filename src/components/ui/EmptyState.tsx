import type { ReactNode } from 'react'

export function EmptyState({ title, description, children }: { title: string; description?: string; children?: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-mp-border bg-mp-bg-raised px-6 py-8 text-center">
      <p className="text-sm font-medium text-mp-text">{title}</p>
      {description && <p className="mt-1 text-sm text-mp-text-muted">{description}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  )
}
