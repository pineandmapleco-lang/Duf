export function PanelLoading({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-2.5 animate-fadeIn" aria-busy="true" aria-live="polite">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-12 w-full animate-pulse rounded-lg bg-base-800/70"
          style={{ animationDelay: `${i * 80}ms` }}
        />
      ))}
    </div>
  );
}

export function PanelError({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-lg border border-status-blocked/30 bg-status-blocked/10 px-4 py-3 text-sm text-status-blocked animate-fadeIn"
    >
      <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-status-blocked" />
      <div>
        <p className="font-medium">Notion connection unavailable</p>
        <p className="mt-0.5 text-status-blocked/80">{message}</p>
      </div>
    </div>
  );
}

export function PanelEmpty({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-base-600 px-4 py-8 text-center animate-fadeIn">
      <p className="text-sm font-medium text-base-500">{title}</p>
      {hint && <p className="max-w-sm text-xs text-base-500/80">{hint}</p>}
    </div>
  );
}
