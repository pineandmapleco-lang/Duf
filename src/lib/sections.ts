export interface NavSection {
  id: string
  label: string
}

export const NAV_SECTIONS: NavSection[] = [
  { id: 'action-items', label: 'Action Items' },
  { id: 'revenue', label: 'Revenue' },
  { id: 'projects', label: 'Projects' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'agents', label: 'AI Agents' },
  { id: 'pulse', label: 'Files & Comms' },
]
