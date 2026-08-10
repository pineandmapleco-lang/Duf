import type { DataSourceMode } from '../../types/dashboard'

export type SourceName = 'notion' | 'googleCalendar' | 'googleDrive' | 'gmail'

const ENV_KEYS: Record<SourceName, string> = {
  notion: 'VITE_NOTION_MODE',
  googleCalendar: 'VITE_GOOGLE_CALENDAR_MODE',
  googleDrive: 'VITE_GOOGLE_DRIVE_MODE',
  gmail: 'VITE_GMAIL_MODE',
}

/**
 * Each data source independently resolves to 'mock' or 'live' via its own
 * VITE_*_MODE env var. Defaulting to 'mock' means the dashboard is fully
 * navigable with zero configuration.
 */
export function getSourceMode(source: SourceName): DataSourceMode {
  const raw = (import.meta.env[ENV_KEYS[source]] as string | undefined)?.toLowerCase()
  return raw === 'live' ? 'live' : 'mock'
}

/** Simulates realistic network latency so loading states are actually visible in mock mode. */
export function mockDelay(ms = 350 + Math.random() * 400): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const REFRESH_INTERVAL_MS = 5 * 60 * 1000
