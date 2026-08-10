import type { StatusLevel } from '../../types/dashboard'
import { STATUS_STYLES } from '../../lib/status'

/**
 * Status is always communicated via color + a dot + a text label together —
 * never color alone — so it reads fine without color vision.
 */
export function StatusBadge({ status, className = '' }: { status: StatusLevel; className?: string }) {
  const s = STATUS_STYLES[status]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${s.bg} ${s.border} ${s.text} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} aria-hidden="true" />
      {s.label}
    </span>
  )
}
