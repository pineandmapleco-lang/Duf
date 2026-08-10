import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { fetchDashboardSnapshot, setNotionTaskComplete, type DashboardSnapshot } from '../lib/data-sources'
import { REFRESH_INTERVAL_MS } from '../lib/data-sources/config'

interface DashboardContextValue {
  data: DashboardSnapshot | null
  loading: boolean
  error: string | null
  lastUpdated: string | null
  refresh: () => void
  completedTaskIds: Set<string>
  toggleTaskComplete: (id: string) => void
}

const DashboardContext = createContext<DashboardContextValue | null>(null)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DashboardSnapshot | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)
  const [completedTaskIds, setCompletedTaskIds] = useState<Set<string>>(new Set())
  const inFlight = useRef(false)

  const load = useCallback(async () => {
    if (inFlight.current) return
    inFlight.current = true
    setError(null)
    try {
      const snapshot = await fetchDashboardSnapshot()
      setData(snapshot)
      setLastUpdated(snapshot.fetchedAt)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data')
    } finally {
      setLoading(false)
      inFlight.current = false
    }
  }, [])

  useEffect(() => {
    load()
    const interval = setInterval(load, REFRESH_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [load])

  const toggleTaskComplete = useCallback((id: string) => {
    setCompletedTaskIds((prev) => {
      const next = new Set(prev)
      const willComplete = !next.has(id)
      if (willComplete) next.add(id)
      else next.delete(id)

      // Optimistic UI: flip immediately, persist to Notion in the background,
      // and roll back only if the write fails.
      if (id.startsWith('notion-')) {
        const notionId = id.replace(/^notion-/, '')
        setNotionTaskComplete(notionId, willComplete).catch(() => {
          setCompletedTaskIds((rollback) => {
            const reverted = new Set(rollback)
            if (willComplete) reverted.delete(id)
            else reverted.add(id)
            return reverted
          })
        })
      }

      return next
    })
  }, [])

  const value: DashboardContextValue = {
    data,
    loading,
    error,
    lastUpdated,
    refresh: load,
    completedTaskIds,
    toggleTaskComplete,
  }

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}

export function useDashboard(): DashboardContextValue {
  const ctx = useContext(DashboardContext)
  if (!ctx) throw new Error('useDashboard must be used within a DashboardProvider')
  return ctx
}
