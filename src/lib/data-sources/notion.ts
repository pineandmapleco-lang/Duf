import { addDays, format, subDays, subHours, subMinutes } from 'date-fns'
import { getSourceMode, mockDelay } from './config'
import type {
  AgentActivity,
  NotionTask,
  ProjectStatus,
  ReleaseCalendarItem,
  StatusLevel,
} from '../../types/dashboard'

// Notion (OmniStack) is the primary source of truth for project/release
// status, task data, and AI-agent activity logs.

const NOTION_WORKSPACE_URL = 'https://notion.so/maple-pine-omnistack'

function d(offset: number): string {
  return format(offset >= 0 ? addDays(new Date(), offset) : subDays(new Date(), -offset), 'yyyy-MM-dd')
}

function tasksMock(): NotionTask[] {
  return [
    {
      id: 'task-1',
      title: 'Finalize COA vol. 3 cover lettering pass',
      entity: 'wiseminds',
      project: 'COA (Children of Ash)',
      dueDate: d(0),
      status: 'todo',
      assignee: 'Trixie',
      url: `${NOTION_WORKSPACE_URL}/coa-lettering`,
    },
    {
      id: 'task-2',
      title: 'Approve KDP proof for The Wren Cycle Bk. 2',
      entity: 'wiseminds',
      project: 'The Wren Cycle',
      dueDate: d(0),
      status: 'todo',
      assignee: 'Trixie',
      url: `${NOTION_WORKSPACE_URL}/wren-kdp-proof`,
    },
    {
      id: 'task-3',
      title: 'Send Osgood resonator build progress photos',
      entity: 'blackgoat',
      project: 'Osgood Custom Resonator',
      dueDate: d(-1),
      status: 'todo',
      assignee: 'Trixie',
      url: `${NOTION_WORKSPACE_URL}/osgood-photos`,
    },
    {
      id: 'task-4',
      title: 'Log Element No.34 batch #22 QC results',
      entity: 'element34',
      project: 'Autumn Apothecary Batch',
      dueDate: d(0),
      status: 'in-progress',
      assignee: 'Trixie',
      url: `${NOTION_WORKSPACE_URL}/e34-batch-22`,
    },
    {
      id: 'task-5',
      title: 'Reply to Maddy Made Them wholesale inquiry',
      entity: 'maddymade',
      project: 'Wholesale Outreach',
      dueDate: d(1),
      status: 'todo',
      assignee: 'Trixie',
      url: `${NOTION_WORKSPACE_URL}/mmt-wholesale`,
    },
    {
      id: 'task-6',
      title: 'Confirm Eats & Treats farmers market cart stock',
      entity: 'eatstreats',
      project: 'Weekend Market Circuit',
      dueDate: d(0),
      status: 'todo',
      assignee: 'Trixie',
      url: `${NOTION_WORKSPACE_URL}/et-market-stock`,
    },
    {
      id: 'task-7',
      title: 'Review Chad\'s Q3 cross-entity ops summary',
      entity: 'omnistack',
      project: 'OmniStack Ops',
      dueDate: d(-2),
      status: 'todo',
      assignee: 'Trixie',
      url: `${NOTION_WORKSPACE_URL}/q3-ops-summary`,
    },
    {
      id: 'task-8',
      title: 'Pick color variant for Sable & Smoke poster run',
      entity: 'wiseminds',
      project: 'Sable & Smoke',
      dueDate: d(1),
      status: 'todo',
      assignee: 'Trixie',
      url: `${NOTION_WORKSPACE_URL}/sable-poster`,
    },
  ]
}

function projectsMock(): ProjectStatus[] {
  return [
    {
      id: 'proj-coa',
      name: 'COA (Children of Ash)',
      entity: 'wiseminds',
      status: 'good',
      phase: 'Vol. 3 — Line Art & Lettering',
      nextMilestone: 'Interior files to printer',
      nextMilestoneDate: d(9),
      percentComplete: 72,
      summary: 'Flagship graphic novel series. Vol. 3 tracking toward fall release.',
    },
    {
      id: 'proj-wren',
      name: 'The Wren Cycle',
      entity: 'wiseminds',
      status: 'warn',
      phase: 'Book 2 — KDP Proof Review',
      nextMilestone: 'Approve final proof',
      nextMilestoneDate: d(3),
      percentComplete: 88,
      summary: 'Proof revisions running a few days behind the original schedule.',
    },
    {
      id: 'proj-sable',
      name: 'Sable & Smoke',
      entity: 'wiseminds',
      status: 'good',
      phase: 'Campaign — Pre-Launch Assets',
      nextMilestone: 'Poster run to print',
      nextMilestoneDate: d(6),
      percentComplete: 45,
      summary: 'New narrative campaign building toward a fall teaser drop.',
    },
    {
      id: 'proj-osgood',
      name: 'Osgood Custom Resonator',
      entity: 'blackgoat',
      status: 'good',
      phase: 'Fabrication — Body & Neck Fit',
      nextMilestone: 'Client progress review',
      nextMilestoneDate: d(4),
      percentComplete: 60,
      summary: 'Commissioned resonator guitar build, on schedule for client review.',
    },
    {
      id: 'proj-meridian',
      name: 'Meridian Studio Mandolin',
      entity: 'blackgoat',
      status: 'bad',
      phase: 'Fabrication — Awaiting Materials',
      nextMilestone: 'Tonewood delivery',
      nextMilestoneDate: d(14),
      percentComplete: 20,
      summary: 'Blocked on a delayed tonewood supplier shipment.',
    },
    {
      id: 'proj-callahan',
      name: 'Callahan Cutting Board Set',
      entity: 'blackgoat',
      status: 'good',
      phase: 'Finishing — Oil & Wax',
      nextMilestone: 'Ship to client',
      nextMilestoneDate: d(2),
      percentComplete: 95,
      summary: 'Nearly complete commission, on track to ship this week.',
    },
    {
      id: 'proj-e34-batch',
      name: 'Autumn Apothecary Batch',
      entity: 'element34',
      status: 'good',
      phase: 'Production — Batch #22',
      nextMilestone: 'QC sign-off',
      nextMilestoneDate: d(1),
      percentComplete: 80,
      summary: 'Seasonal candle & botanical batch moving through QC.',
    },
    {
      id: 'proj-mmt-wholesale',
      name: 'Wholesale Outreach',
      entity: 'maddymade',
      status: 'warn',
      phase: 'Outbound — Buyer Follow-ups',
      nextMilestone: 'Sample kits sent',
      nextMilestoneDate: d(7),
      percentComplete: 35,
      summary: 'New wholesale channel push, follow-ups slower than planned.',
    },
    {
      id: 'proj-et-market',
      name: 'Weekend Market Circuit',
      entity: 'eatstreats',
      status: 'good',
      phase: 'Operations — Weekly Rotation',
      nextMilestone: 'Next market day',
      nextMilestoneDate: d(2),
      percentComplete: 100,
      summary: 'Steady-state mobile café rotation across weekend markets.',
    },
  ]
}

function releaseCalendarMock(): ReleaseCalendarItem[] {
  return [
    {
      id: 'rc-1',
      title: 'COA Vol. 3 — Interior files due to printer',
      entity: 'wiseminds',
      date: d(9),
      kind: 'deadline',
      detail: 'Final press-ready files must be uploaded to the printer portal.',
    },
    {
      id: 'rc-2',
      title: 'The Wren Cycle Bk. 2 — KDP proof approval',
      entity: 'wiseminds',
      date: d(3),
      kind: 'deadline',
      detail: 'Last checkpoint before wide release goes live on Amazon KDP.',
    },
    {
      id: 'rc-3',
      title: 'Sable & Smoke — Teaser trailer drop',
      entity: 'wiseminds',
      date: d(12),
      kind: 'marketing',
      detail: 'First public teaser across socials and the mailing list.',
    },
    {
      id: 'rc-4',
      title: 'Autumn Equinox botanical release',
      entity: 'element34',
      date: d(18),
      kind: 'ritual',
      detail: 'Seasonal candle & apothecary collection goes live in the shop.',
    },
    {
      id: 'rc-5',
      title: 'Callahan Cutting Board Set — client delivery',
      entity: 'blackgoat',
      date: d(2),
      kind: 'release',
      detail: 'Final commissioned piece ships to the client.',
    },
    {
      id: 'rc-6',
      title: 'Maddy Made Them wholesale sample kits ship',
      entity: 'maddymade',
      date: d(7),
      kind: 'deadline',
      detail: 'Sample kits mail out to three prospective wholesale buyers.',
    },
    {
      id: 'rc-7',
      title: 'COA Vol. 3 — Cover reveal',
      entity: 'wiseminds',
      date: d(21),
      kind: 'marketing',
      detail: 'Full cover art reveal timed with preorder open.',
    },
    {
      id: 'rc-8',
      title: 'Harvest Market pop-up (Eats & Treats)',
      entity: 'eatstreats',
      date: d(5),
      kind: 'ritual',
      detail: 'Seasonal menu debut at the downtown harvest market.',
    },
    {
      id: 'rc-9',
      title: 'Osgood Custom Resonator — client review call',
      entity: 'blackgoat',
      date: d(4),
      kind: 'deadline',
      detail: 'Progress walkthrough with the client before final assembly.',
    },
    {
      id: 'rc-10',
      title: 'COA Vol. 3 — Wide release',
      entity: 'wiseminds',
      date: d(45),
      kind: 'release',
      detail: 'Print + KDP simultaneous release across all storefronts.',
    },
    {
      id: 'rc-11',
      title: 'Maddy Made Them — new jewelry drop',
      entity: 'maddymade',
      date: d(28),
      kind: 'release',
      detail: 'Limited-run seasonal jewelry collection launch.',
    },
    {
      id: 'rc-12',
      title: 'Winter menu planning deadline (Eats & Treats)',
      entity: 'eatstreats',
      date: d(35),
      kind: 'deadline',
      detail: 'Menu + sourcing plan due for the winter market season.',
    },
  ]
}

function agentActivityMock(): AgentActivity[] {
  const now = new Date()
  return [
    {
      id: 'agent-chad',
      name: 'Chad',
      role: 'Chief AI Officer',
      status: 'good',
      currentAssignment: 'Cross-entity Q3 operations review',
      lastHandoffReceived: {
        withWhom: 'Manus',
        summary: 'Weekly execution rollup for all five entities',
        time: subHours(now, 3).toISOString(),
      },
      lastHandoffSent: {
        withWhom: 'Main AI Brain',
        summary: 'Prioritized action list for the week',
        time: subHours(now, 2).toISOString(),
      },
      notionUrl: `${NOTION_WORKSPACE_URL}/agents/chad`,
    },
    {
      id: 'agent-claude',
      name: 'Claude',
      role: 'Research Director / Canon Architect',
      status: 'good',
      currentAssignment: 'COA vol. 3 canon consistency pass',
      lastHandoffReceived: {
        withWhom: 'Gem',
        summary: 'Trend scouting notes for fall graphic novel market',
        time: subHours(now, 5).toISOString(),
      },
      lastHandoffSent: {
        withWhom: 'Dispatch',
        summary: 'Finalized lettering script for vol. 3, chapters 4-6',
        time: subHours(now, 1).toISOString(),
      },
      notionUrl: `${NOTION_WORKSPACE_URL}/agents/claude`,
    },
    {
      id: 'agent-dispatch',
      name: 'Dispatch',
      role: 'Engineering / Implementation',
      status: 'warn',
      currentAssignment: 'Wren Cycle KDP proof pipeline fixes',
      lastHandoffReceived: {
        withWhom: 'Claude',
        summary: 'Finalized lettering script for vol. 3, chapters 4-6',
        time: subHours(now, 1).toISOString(),
      },
      lastHandoffSent: {
        withWhom: 'Codey',
        summary: 'Proof-generation script needs a fix for bleed margins',
        time: subMinutes(now, 40).toISOString(),
      },
      notionUrl: `${NOTION_WORKSPACE_URL}/agents/dispatch`,
    },
    {
      id: 'agent-codey',
      name: 'Codey',
      role: 'Technical Engineering',
      status: 'good',
      currentAssignment: 'Command Center dashboard build-out',
      lastHandoffReceived: {
        withWhom: 'Dispatch',
        summary: 'Proof-generation script needs a fix for bleed margins',
        time: subMinutes(now, 40).toISOString(),
      },
      lastHandoffSent: {
        withWhom: 'Main AI Brain',
        summary: 'Bleed margin fix deployed, proofs regenerating',
        time: subMinutes(now, 12).toISOString(),
      },
      notionUrl: `${NOTION_WORKSPACE_URL}/agents/codey`,
    },
    {
      id: 'agent-gem',
      name: 'Gem',
      role: 'Multimodal / Trend Scouting',
      status: 'good',
      currentAssignment: 'Sable & Smoke teaser visual concepts',
      lastHandoffReceived: {
        withWhom: 'Manus',
        summary: 'Campaign brief for Sable & Smoke teaser',
        time: subHours(now, 8).toISOString(),
      },
      lastHandoffSent: {
        withWhom: 'Claude',
        summary: 'Trend scouting notes for fall graphic novel market',
        time: subHours(now, 5).toISOString(),
      },
      notionUrl: `${NOTION_WORKSPACE_URL}/agents/gem`,
    },
    {
      id: 'agent-manus',
      name: 'Manus',
      role: 'Execution Director',
      status: 'good',
      currentAssignment: 'Weekend market + wholesale outreach coordination',
      lastHandoffReceived: {
        withWhom: 'Main AI Brain',
        summary: 'This week\'s priority list across all entities',
        time: subHours(now, 6).toISOString(),
      },
      lastHandoffSent: {
        withWhom: 'Chad',
        summary: 'Weekly execution rollup for all five entities',
        time: subHours(now, 3).toISOString(),
      },
      notionUrl: `${NOTION_WORKSPACE_URL}/agents/manus`,
    },
    {
      id: 'agent-brain',
      name: 'Main AI Brain',
      role: 'Orchestration',
      status: 'good',
      currentAssignment: 'Coordinating morning sync across the AI team',
      lastHandoffReceived: {
        withWhom: 'Codey',
        summary: 'Bleed margin fix deployed, proofs regenerating',
        time: subMinutes(now, 12).toISOString(),
      },
      lastHandoffSent: {
        withWhom: 'Manus',
        summary: 'This week\'s priority list across all entities',
        time: subHours(now, 6).toISOString(),
      },
      notionUrl: `${NOTION_WORKSPACE_URL}/agents/main-brain`,
    },
  ]
}

async function fetchLiveTasks(): Promise<NotionTask[]> {
  // Live wiring point: add a server-side proxy (see api/notion-agent-activity.js
  // for the pattern) that queries the real Tasks data source and returns raw
  // rows for mapping here. Not yet implemented — the real workspace has
  // several "Tasks" databases, and the live one tags brand with a coarse
  // "Division" field (Consumer Brands) rather than one value per entity, so
  // this needs a product decision before it's wired up.
  throw new Error('Live Notion Tasks integration not yet implemented — set VITE_NOTION_MODE=mock')
}

export async function getNotionTasks(): Promise<NotionTask[]> {
  if (getSourceMode('notion') === 'live') return fetchLiveTasks()
  await mockDelay()
  return tasksMock()
}

export async function getNotionProjects(): Promise<ProjectStatus[]> {
  if (getSourceMode('notion') === 'live') {
    // Live wiring point: same server-side proxy pattern as Agent Activity,
    // querying the Projects/Release Status data source. Not yet implemented.
    throw new Error('Live Notion Projects integration not yet implemented — set VITE_NOTION_MODE=mock')
  }
  await mockDelay()
  return projectsMock()
}

export async function getReleaseCalendar(): Promise<ReleaseCalendarItem[]> {
  if (getSourceMode('notion') === 'live') return fetchLiveReleaseCalendar()
  await mockDelay()
  return releaseCalendarMock()
}

// Static roster metadata (name/role/Notion deep link) for the seven agents
// this dashboard tracks. Live mode fills in status/assignment/handoffs from
// the real Handoff Ledger; mock mode uses agentActivityMock() below instead.
interface AgentRosterMeta {
  id: string
  name: string
  role: string
  notionUrl: string
}

const AGENT_ROSTER_META: AgentRosterMeta[] = [
  { id: 'agent-chad', name: 'Chad', role: 'Chief AI Officer', notionUrl: `${NOTION_WORKSPACE_URL}/agents/chad` },
  {
    id: 'agent-claude',
    name: 'Claude',
    role: 'Research Director / Canon Architect',
    notionUrl: `${NOTION_WORKSPACE_URL}/agents/claude`,
  },
  {
    id: 'agent-dispatch',
    name: 'Dispatch',
    role: 'Engineering / Implementation',
    notionUrl: `${NOTION_WORKSPACE_URL}/agents/dispatch`,
  },
  { id: 'agent-codey', name: 'Codey', role: 'Technical Engineering', notionUrl: `${NOTION_WORKSPACE_URL}/agents/codey` },
  {
    id: 'agent-gem',
    name: 'Gem',
    role: 'Multimodal / Trend Scouting',
    notionUrl: `${NOTION_WORKSPACE_URL}/agents/gem`,
  },
  { id: 'agent-manus', name: 'Manus', role: 'Execution Director', notionUrl: `${NOTION_WORKSPACE_URL}/agents/manus` },
  {
    id: 'agent-brain',
    name: 'Main AI Brain',
    role: 'Orchestration',
    notionUrl: `${NOTION_WORKSPACE_URL}/agents/main-brain`,
  },
]

const AUTHORITY_TO_STATUS: Record<string, StatusLevel> = { Green: 'good', Yellow: 'warn', Red: 'bad' }

// Minimal shape of a raw Notion page row as returned by the Handoff Ledger
// query — only the bits this mapper reads.
interface NotionPropertyValue {
  title?: { plain_text: string }[]
  rich_text?: { plain_text: string }[]
  select?: { name: string }
  date?: { start: string }
}
interface NotionLedgerRow {
  id: string
  properties: Record<string, NotionPropertyValue>
}

function plainText(prop: NotionPropertyValue | undefined): string {
  const parts = prop?.title ?? prop?.rich_text
  return parts?.map((t) => t.plain_text).join('') ?? ''
}

function selectName(prop: NotionPropertyValue | undefined): string | undefined {
  return prop?.select?.name
}

function dateStart(prop: NotionPropertyValue | undefined): string | undefined {
  return prop?.date?.start
}

// The real "Master Release Calendar" data source covers far more release
// types than our 4-way kind enum — this collapses them onto it. Everything
// from this source is a WiseMinds Studios narrative/IP property, so entity
// is hardcoded rather than resolved from the (relation-typed) IP column.
const RELEASE_TYPE_TO_KIND: Record<string, ReleaseCalendarItem['kind']> = {
  'Book Release': 'release',
  'Chapter Drop': 'release',
  'Codex Release': 'release',
  'Set Release': 'release',
  'Preorder Launch': 'release',
  'Print Proof / Manufacturing': 'release',
  'Shipping / Fulfillment': 'release',
  'Website Drop': 'marketing',
  'Cover Reveal': 'marketing',
  'Trailer/Video': 'marketing',
  'Festival Special': 'ritual',
  Prerelease: 'deadline',
  'Patch/Balance': 'deadline',
  'Playtest Milestone': 'deadline',
  'Council Gate Review': 'deadline',
}

async function fetchLiveReleaseCalendar(): Promise<ReleaseCalendarItem[]> {
  const response = await fetch('/api/notion-release-calendar')
  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { error?: string }
    throw new Error(body.error ?? `Notion proxy returned HTTP ${response.status}`)
  }
  const { results } = (await response.json()) as { results: NotionLedgerRow[] }

  return results
    .map((row): ReleaseCalendarItem | null => {
      const date = dateStart(row.properties['Date'])
      if (!date) return null
      const releaseType = selectName(row.properties['Release Type']) ?? ''
      const status = selectName(row.properties['Status']) ?? ''
      const notes = plainText(row.properties['Notes'])
      return {
        id: row.id,
        title: plainText(row.properties['Name']) || 'Untitled release',
        entity: 'wiseminds',
        date,
        kind: RELEASE_TYPE_TO_KIND[releaseType] ?? 'release',
        detail: notes || [releaseType, status].filter(Boolean).join(' — ') || 'No further detail logged.',
      }
    })
    .filter((item): item is ReleaseCalendarItem => item !== null)
}

async function fetchLiveAgentActivity(): Promise<AgentActivity[]> {
  const response = await fetch('/api/notion-agent-activity')
  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { error?: string }
    throw new Error(body.error ?? `Notion proxy returned HTTP ${response.status}`)
  }
  const { results } = (await response.json()) as { results: NotionLedgerRow[] }

  return AGENT_ROSTER_META.map((meta) => {
    const nameLower = meta.name.toLowerCase()
    const involving = results.filter((row) => {
      const from = plainText(row.properties['From']).toLowerCase()
      const to = plainText(row.properties['To']).toLowerCase()
      return from.includes(nameLower) || to.includes(nameLower)
    })
    const received = involving.find((row) => plainText(row.properties['To']).toLowerCase().includes(nameLower))
    const sent = involving.find((row) => plainText(row.properties['From']).toLowerCase().includes(nameLower))
    const latest = involving[0]

    return {
      id: meta.id,
      name: meta.name,
      role: meta.role,
      status: AUTHORITY_TO_STATUS[selectName(latest?.properties['Authority']) ?? ''] ?? 'good',
      currentAssignment: latest
        ? plainText(latest.properties['Task / Handoff']) || plainText(latest.properties['Next Action']) || 'No current assignment logged'
        : 'No recent handoff activity',
      lastHandoffReceived: received
        ? {
            withWhom: plainText(received.properties['From']) || '—',
            summary: plainText(received.properties['Task / Handoff']),
            time: dateStart(received.properties['Created']) ?? new Date().toISOString(),
          }
        : { withWhom: '—', summary: 'No recent handoff received', time: new Date().toISOString() },
      lastHandoffSent: sent
        ? {
            withWhom: plainText(sent.properties['To']) || '—',
            summary: plainText(sent.properties['Task / Handoff']),
            time: dateStart(sent.properties['Created']) ?? new Date().toISOString(),
          }
        : { withWhom: '—', summary: 'No recent handoff sent', time: new Date().toISOString() },
      notionUrl: meta.notionUrl,
    }
  })
}

export async function getAgentActivity(): Promise<AgentActivity[]> {
  if (getSourceMode('notion') === 'live') return fetchLiveAgentActivity()
  await mockDelay()
  return agentActivityMock()
}

export async function setNotionTaskComplete(taskId: string, completed: boolean): Promise<void> {
  if (getSourceMode('notion') === 'live') {
    // Live wiring point: add a server-side proxy (api/notion-task-complete.js)
    // that PATCHes https://api.notion.com/v1/pages/{taskId} with
    // { properties: { Status: { status: { name: completed ? 'Done' : 'To-do' } } } }
    // using NOTION_API_KEY server-side. Not yet implemented.
    throw new Error(
      `Live Notion write-back not yet implemented for task ${taskId} (completed=${completed}) — set VITE_NOTION_MODE=mock`,
    )
  }
  await mockDelay(120)
}

export const NOTION_LINKS = {
  workspace: NOTION_WORKSPACE_URL,
}
