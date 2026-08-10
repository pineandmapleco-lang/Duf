import { useDashboard } from '../context/DashboardContext'
import { NOTION_LINKS } from '../lib/data-sources/notion'
import { formatClock } from '../lib/format'

const APP_VERSION = '0.1.0'

const QUICK_LINKS = [
  { label: 'Notion — OmniStack', href: NOTION_LINKS.workspace },
  { label: 'Google Drive', href: 'https://drive.google.com' },
  { label: 'Gmail', href: 'https://mail.google.com' },
]

export function Footer() {
  const { lastUpdated } = useDashboard()

  return (
    <footer className="border-t border-mp-border">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {QUICK_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-medium text-mp-text-muted hover:text-mp-accent"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
          <div className="text-xs text-mp-text-faint">
            Maple &amp; Pine Command Center v{APP_VERSION}
            {lastUpdated && <> · Last full sync {formatClock(new Date(lastUpdated))}</>}
          </div>
        </div>
      </div>
    </footer>
  )
}
