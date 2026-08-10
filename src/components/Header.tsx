import { useState } from 'react'
import { useClock } from '../hooks/useClock'
import { useDashboard } from '../context/DashboardContext'
import { formatClock, formatHeaderDate, formatRelativeTime } from '../lib/format'
import { NAV_SECTIONS } from '../lib/sections'

export function Header() {
  const now = useClock()
  const { lastUpdated, loading, error } = useDashboard()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-mp-border bg-mp-bg/90 backdrop-blur supports-[backdrop-filter]:bg-mp-bg/75">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-mp-accent-border bg-mp-accent-bg text-mp-accent font-bold">
            M&P
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-mp-text">Maple &amp; Pine Command Center</p>
            <p className="text-xs text-mp-text-faint">{formatHeaderDate(now)}</p>
          </div>
        </div>

        <nav aria-label="Section navigation" className="hidden items-center gap-1 md:flex">
          {NAV_SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-md px-3 py-2 text-sm text-mp-text-muted transition-colors hover:bg-mp-panel-hover hover:text-mp-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mp-accent"
            >
              {section.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="font-mono text-sm tabular-nums text-mp-text">{formatClock(now)}</p>
            <p className="text-xs text-mp-text-faint">
              {error ? (
                <span className="text-mp-status-bad">Sync error</span>
              ) : loading && !lastUpdated ? (
                'Syncing…'
              ) : lastUpdated ? (
                `Last synced ${formatRelativeTime(lastUpdated)}`
              ) : (
                'Not yet synced'
              )}
            </p>
          </div>
          <span
            className={`hidden h-2 w-2 rounded-full sm:block ${error ? 'bg-mp-status-bad' : 'bg-mp-status-good'}`}
            aria-hidden="true"
          />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-md border border-mp-border p-2 text-mp-text-muted md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle section navigation"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" aria-label="Section navigation" className="border-t border-mp-border px-4 py-2 md:hidden">
          <div className="flex flex-col">
            {NAV_SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm text-mp-text-muted hover:bg-mp-panel-hover hover:text-mp-text"
              >
                {section.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
