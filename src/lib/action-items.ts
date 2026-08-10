import { addDays, format } from 'date-fns'
import type {
  ActionItem,
  CalendarEvent,
  FlaggedThread,
  NotionTask,
} from '../types/dashboard'

function todayStr(): string {
  return format(new Date(), 'yyyy-MM-dd')
}

function tomorrowStr(): string {
  return format(addDays(new Date(), 1), 'yyyy-MM-dd')
}

/**
 * Merges Notion tasks, Calendar events, and flagged Gmail threads into one
 * unified action-item list for "today". Each source is namespaced into the
 * item id so cross-source collisions can't produce accidental duplicates.
 * Sort order: overdue first, then time-sensitive (has a clock time), then
 * everything else.
 */
export function buildTodaysActionItems(
  notionTasks: NotionTask[],
  calendarEvents: CalendarEvent[],
  flaggedThreads: FlaggedThread[],
  completedIds: Set<string>,
): ActionItem[] {
  const today = todayStr()
  const items: ActionItem[] = []

  for (const task of notionTasks) {
    if (task.status === 'done') continue
    if (task.dueDate > today) continue // future tasks aren't "today"
    const id = `notion-${task.id}`
    items.push({
      id,
      source: 'notion',
      title: task.title,
      entity: task.entity,
      dueDate: task.dueDate,
      completed: completedIds.has(id),
      overdue: task.dueDate < today,
      detail: task.project,
      url: task.url,
    })
  }

  for (const event of calendarEvents) {
    if (event.date !== today) continue
    const id = `calendar-${event.id}`
    items.push({
      id,
      source: 'calendar',
      title: event.title,
      entity: event.entity,
      dueDate: event.date,
      dueTime: event.time,
      completed: completedIds.has(id),
      overdue: false,
      detail: event.location,
    })
  }

  for (const thread of flaggedThreads) {
    const receivedDate = format(new Date(thread.receivedTime), 'yyyy-MM-dd')
    const ageMs = Date.now() - new Date(thread.receivedTime).getTime()
    const id = `gmail-${thread.id}`
    items.push({
      id,
      source: 'gmail',
      title: `Reply: ${thread.subject}`,
      entity: thread.entity ?? 'omnistack',
      dueDate: receivedDate <= today ? today : receivedDate,
      completed: completedIds.has(id),
      overdue: ageMs > 24 * 60 * 60 * 1000,
      detail: `${thread.sender} — ${thread.snippet}`,
      url: thread.url,
    })
  }

  return items.sort((a, b) => {
    if (a.overdue !== b.overdue) return a.overdue ? -1 : 1
    const aHasTime = Boolean(a.dueTime)
    const bHasTime = Boolean(b.dueTime)
    if (aHasTime !== bHasTime) return aHasTime ? -1 : 1
    if (aHasTime && bHasTime) return a.dueTime!.localeCompare(b.dueTime!)
    return a.title.localeCompare(b.title)
  })
}

/** Fallback preview so the section is never a blank void when today is clear. */
export function buildTomorrowPreview(notionTasks: NotionTask[]): ActionItem[] {
  const tomorrow = tomorrowStr()
  return notionTasks
    .filter((t) => t.status !== 'done' && t.dueDate === tomorrow)
    .slice(0, 2)
    .map((task) => ({
      id: `notion-${task.id}`,
      source: 'notion' as const,
      title: task.title,
      entity: task.entity,
      dueDate: task.dueDate,
      completed: false,
      overdue: false,
      detail: task.project,
      url: task.url,
    }))
}
