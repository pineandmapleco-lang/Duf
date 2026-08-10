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
}

/**
 * One coordinated, parallel fetch across every data source — never a
 * sequential waterfall. Each source module resolves its own mock/live mode
 * independently, so this function never needs to know which mode is active.
 */
export async function fetchDashboardSnapshot(): Promise<DashboardSnapshot> {
  const [notionTasks, projects, releaseCalendar, agents, revenue, calendarEvents, driveFiles, flaggedThreads] =
    await Promise.all([
      getNotionTasks(),
      getNotionProjects(),
      getReleaseCalendar(),
      getAgentActivity(),
      getRevenueData(),
      getTodaysCalendarEvents(),
      getRecentDriveFiles(),
      getFlaggedThreads(),
    ])

  return {
    notionTasks,
    projects,
    releaseCalendar,
    agents,
    revenue,
    calendarEvents,
    driveFiles,
    flaggedThreads,
    fetchedAt: new Date().toISOString(),
  }
}

export { setNotionTaskComplete, getSourceMode }
