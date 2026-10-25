// Shared domain types for the Maple & Pine Command Center.
// Every data-source module (mock or live) speaks these shapes so
// components never know or care where the data actually came from.

export type EntityId =
  | 'wiseminds'
  | 'blackgoat'
  | 'element34'
  | 'maddymade'
  | 'eatstreats'
  | 'omnistack'

export interface EntityMeta {
  id: EntityId
  name: string
  shortName: string
}

export const ENTITIES: Record<EntityId, EntityMeta> = {
  wiseminds: { id: 'wiseminds', name: 'WiseMinds Studios', shortName: 'WiseMinds' },
  blackgoat: { id: 'blackgoat', name: 'Black Goat Wood Works', shortName: 'Black Goat' },
  element34: { id: 'element34', name: 'Element No.34', shortName: 'Element No.34' },
  maddymade: { id: 'maddymade', name: 'Maddy Made Them', shortName: 'Maddy Made Them' },
  eatstreats: { id: 'eatstreats', name: 'Eats & Treats', shortName: 'Eats & Treats' },
  omnistack: { id: 'omnistack', name: 'Cross-Entity / OmniStack', shortName: 'OmniStack' },
}

export type StatusLevel = 'good' | 'warn' | 'bad'

export const STATUS_LABEL: Record<StatusLevel, string> = {
  good: 'On track',
  warn: 'At risk',
  bad: 'Blocked',
}

export type ActionItemSource = 'notion' | 'calendar' | 'gmail'

export interface ActionItem {
  id: string
  source: ActionItemSource
  title: string
  entity: EntityId
  /** ISO date (YYYY-MM-DD) the item is due/relevant for */
  dueDate: string
  /** HH:mm 24h time, only present for time-sensitive calendar items */
  dueTime?: string
  completed: boolean
  overdue: boolean
  detail?: string
  url?: string
}

export interface NotionTask {
  id: string
  title: string
  entity: EntityId
  project?: string
  dueDate: string
  status: 'todo' | 'in-progress' | 'done'
  assignee: string
  url: string
}

export interface ProjectStatus {
  id: string
  name: string
  entity: EntityId
  status: StatusLevel
  phase: string
  nextMilestone: string
  nextMilestoneDate: string
  percentComplete: number
  summary: string
}

export interface ReleaseCalendarItem {
  id: string
  title: string
  entity: EntityId
  date: string
  kind: 'release' | 'marketing' | 'ritual' | 'deadline'
  detail: string
}

export interface AgentHandoff {
  withWhom: string
  summary: string
  time: string
}

export interface AgentActivity {
  id: string
  name: string
  role: string
  status: StatusLevel
  currentAssignment: string
  lastHandoffReceived: AgentHandoff
  lastHandoffSent: AgentHandoff
  notionUrl: string
}

export interface RevenueCategoryBreakdown {
  category: 'book-ip' | 'client-work' | 'product-sales' | 'ai-consulting'
  label: string
  amount: number
  /** Last 14 days of daily totals for this category, oldest first — for sparklines. */
  trend: number[]
}

export interface RevenuePoint {
  date: string
  amount: number
}

export interface RevenueByEntity {
  entity: EntityId
  amount: number
  /** Last 14 days of daily totals for this entity, oldest first — for sparklines. */
  trend: number[]
}

export interface RevenueData {
  thisMonthTotal: number
  lastMonthTotal: number
  trailing90: RevenuePoint[]
  categories: RevenueCategoryBreakdown[]
  byEntity: RevenueByEntity[]
}

export interface CalendarEvent {
  id: string
  title: string
  entity: EntityId
  date: string
  time?: string
  allDay: boolean
  location?: string
}

export interface DriveFile {
  id: string
  name: string
  entity: EntityId
  modifiedTime: string
  modifiedBy: string
  project?: string
  url: string
}

export interface FlaggedThread {
  id: string
  subject: string
  sender: string
  senderEmail: string
  snippet: string
  entity?: EntityId
  receivedTime: string
  url: string
}

export type DataSourceMode = 'mock' | 'live'

export interface SourceMeta {
  mode: DataSourceMode
  lastUpdated: string
}
