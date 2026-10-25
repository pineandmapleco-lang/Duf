import { getAgentActivity, getNotionProjects, getNotionTasks, getReleaseCalendar, setNotionTaskComplete } from './notion'
import { getTodaysCalendarEvents } from './google-calendar'
import { getRecentDriveFiles } from './google-drive'
import { getFlaggedThreads } from './gmail'
import { getRevenueData } from './revenue'
import { getSourceMode } from './config'
import type {
  AgentActivity,
  CalendarEvent,
  DriveFile,
  FlaggedThread,
  NotionTask,
  ProjectStatus,
  ReleaseCalendarItem,
  RevenueData,
} from '../../types/dashboard'

const EMPTY_REVENUE: RevenueData = { thisMonthTotal: 0, lastMonthTotal: 0, trailing90: [], categories: [], byEntity: [] }

export interface DashboardSnapshot {
  notionTasks: NotionTask[]
  projects: ProjectStatus[]
  releaseCalendar: ReleaseCalendarItem[]
  agents: AgentActivity[]
  revenue: RevenueData
  calendarEvents: CalendarEvent[]
  driveFiles: DriveFile[]
  flaggedThreads: FlaggedThread[]
  fetchedAt: string
  /** Per-source failure messages, e.g. a misconfigured live source — the rest of the dashboard still renders. */
  sourceErrors: Partial<Record<keyof Omit<DashboardSnapshot, 'fetchedAt' | 'sourceErrors'>, string>>
}

function settle<T>(result: PromiseSettledResult<T>, fallback: T, label: string): { value: T; error?: string } {
  if (result.status === 'fulfilled') return { value: result.value }
  const message = result.reason instanceof Error ? result.reason.message : String(result.reason)
  console.error(`[dashboard] ${label} failed, falling back to empty state:`, message)
  return { value: fallback, error: message }
}

/**
 * One coordinated, parallel fetch across every data source — never a
 * sequential waterfall. Each source module resolves its own mock/live mode
 * independently, so this function never needs to know which mode is active.
 *
 * Uses allSettled rather than all: a single misconfigured live source (e.g.
 * a missing Notion token) degrades only its own section to an empty state
 * instead of blanking out the whole dashboard.
 */
export async function fetchDashboardSnapshot(): Promise<DashboardSnapshot> {
  const [notionTasks, projects, releaseCalendar, agents, revenue, calendarEvents, driveFiles, flaggedThreads] =
    await Promise.allSettled([
      getNotionTasks(),
      getNotionProjects(),
      getReleaseCalendar(),
      getAgentActivity(),
      getRevenueData(),
      getTodaysCalendarEvents(),
      getRecentDriveFiles(),
      getFlaggedThreads(),
    ])

  const notionTasksR = settle(notionTasks, [], 'Notion tasks')
  const projectsR = settle(projects, [], 'Notion projects')
  const releaseCalendarR = settle(releaseCalendar, [], 'Release calendar')
  const agentsR = settle(agents, [], 'Agent activity')
  const revenueR = settle(revenue, EMPTY_REVENUE, 'Revenue')
  const calendarEventsR = settle(calendarEvents, [], 'Calendar events')
  const driveFilesR = settle(driveFiles, [], 'Drive files')
  const flaggedThreadsR = settle(flaggedThreads, [], 'Flagged threads')

  const sourceErrors: DashboardSnapshot['sourceErrors'] = {}
  if (notionTasksR.error) sourceErrors.notionTasks = notionTasksR.error
  if (projectsR.error) sourceErrors.projects = projectsR.error
  if (releaseCalendarR.error) sourceErrors.releaseCalendar = releaseCalendarR.error
  if (agentsR.error) sourceErrors.agents = agentsR.error
  if (revenueR.error) sourceErrors.revenue = revenueR.error
  if (calendarEventsR.error) sourceErrors.calendarEvents = calendarEventsR.error
  if (driveFilesR.error) sourceErrors.driveFiles = driveFilesR.error
  if (flaggedThreadsR.error) sourceErrors.flaggedThreads = flaggedThreadsR.error

  return {
    notionTasks: notionTasksR.value,
    projects: projectsR.value,
    releaseCalendar: releaseCalendarR.value,
    agents: agentsR.value,
    revenue: revenueR.value,
    calendarEvents: calendarEventsR.value,
    driveFiles: driveFilesR.value,
    flaggedThreads: flaggedThreadsR.value,
    fetchedAt: new Date().toISOString(),
    sourceErrors,
  }
}

export { setNotionTaskComplete, getSourceMode }
