import { format } from 'date-fns'
import { getSourceMode, mockDelay } from './config'
import type { CalendarEvent } from '../../types/dashboard'

function todayStr(): string {
  return format(new Date(), 'yyyy-MM-dd')
}

function eventsMock(): CalendarEvent[] {
  const today = todayStr()
  return [
    {
      id: 'cal-1',
      title: 'Client review call — Osgood Resonator',
      entity: 'blackgoat',
      date: today,
      time: '10:30',
      allDay: false,
      location: 'Zoom',
    },
    {
      id: 'cal-2',
      title: 'Weekend market prep window',
      entity: 'eatstreats',
      date: today,
      time: '14:00',
      allDay: false,
      location: 'Commissary kitchen',
    },
    {
      id: 'cal-3',
      title: 'Wholesale buyer intro call — Maddy Made Them',
      entity: 'maddymade',
      date: today,
      time: '16:00',
      allDay: false,
      location: 'Phone',
    },
    {
      id: 'cal-4',
      title: 'AI team morning sync',
      entity: 'omnistack',
      date: today,
      time: '08:00',
      allDay: false,
      location: 'OmniStack workspace',
    },
    {
      id: 'cal-5',
      title: 'Autumn Apothecary batch QC window',
      entity: 'element34',
      date: today,
      allDay: true,
    },
  ]
}

async function fetchLiveEvents(): Promise<CalendarEvent[]> {
  // Live wiring point: an OAuth access token is a real secret and must never
  // live in a VITE_-prefixed (client-bundled) env var. Add a server-side
  // proxy — e.g. api/google-calendar-events.js, same pattern as
  // api/notion-agent-activity.js — that holds the token/refresh flow and
  // calls GET https://www.googleapis.com/calendar/v3/calendars/{calendarId}/events
  // with timeMin/timeMax set to today's bounds, then fetch() that endpoint here.
  throw new Error('Live Google Calendar integration not yet implemented — set VITE_GOOGLE_CALENDAR_MODE=mock')
}

export async function getTodaysCalendarEvents(): Promise<CalendarEvent[]> {
  if (getSourceMode('googleCalendar') === 'live') return fetchLiveEvents()
  await mockDelay()
  return eventsMock()
}
