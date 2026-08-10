export function LoadingBlock({ rows = 3, label = 'Loading' }: { rows?: number; label?: string }) {
  return (
    <div role="status" aria-label={label} className="space-y-2.5">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-14 animate-pulse rounded-lg border border-mp-border-soft bg-mp-panel"
          style={{ animationDelay: `${i * 80}ms` }}
        />
      ))}
      <span className="sr-only">{label}…</span>
    </div>
  )
}
