import { format, subDays } from 'date-fns'
import { getSourceMode, mockDelay } from './config'
import type { EntityId, RevenueData } from '../../types/dashboard'

// Revenue is tracked as one unified stream (books/IP, client work, product
// sales, AI consulting) with every transaction tagged by entity, so it can
// be sliced either way in the UI. Source of truth lives in the Notion
// revenue tracker database, so this rides the same VITE_NOTION_MODE switch.

interface Category {
  key: 'book-ip' | 'client-work' | 'product-sales' | 'ai-consulting'
  label: string
}

const CATEGORIES: Category[] = [
  { key: 'book-ip', label: 'Book / IP Sales' },
  { key: 'client-work', label: 'Client Work' },
  { key: 'product-sales', label: 'Product Sales' },
  { key: 'ai-consulting', label: 'AI Consulting' },
]

interface EntityProfile {
  entity: EntityId
  category: Category['key']
  baseDaily: number
  variance: number
  weekendMultiplier: number
}

const PROFILES: EntityProfile[] = [
  { entity: 'wiseminds', category: 'book-ip', baseDaily: 190, variance: 90, weekendMultiplier: 1.15 },
  { entity: 'blackgoat', category: 'client-work', baseDaily: 240, variance: 220, weekendMultiplier: 0.6 },
  { entity: 'element34', category: 'product-sales', baseDaily: 95, variance: 55, weekendMultiplier: 1.3 },
  { entity: 'maddymade', category: 'product-sales', baseDaily: 70, variance: 45, weekendMultiplier: 1.2 },
  { entity: 'eatstreats', category: 'product-sales', baseDaily: 150, variance: 80, weekendMultiplier: 2.1 },
  { entity: 'omnistack', category: 'ai-consulting', baseDaily: 210, variance: 70, weekendMultiplier: 0.15 },
]

// Deterministic PRNG so mock revenue is stable across reloads within a session.
function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const GENERATION_WINDOW_DAYS = 100

function revenueMock(): RevenueData {
  const rng = mulberry32(20260810)
  const today = new Date()
  const currentMonthKey = format(today, 'yyyy-MM')
  const lastMonthKey = format(subDays(new Date(today.getFullYear(), today.getMonth(), 1), 1), 'yyyy-MM')

  const dailyTotals = new Map<string, number>()
  const categoryTotals = new Map<Category['key'], number>()
  const entityTotals = new Map<EntityId, number>()
  const categoryTrends = new Map<Category['key'], number[]>(CATEGORIES.map((c) => [c.key, []]))
  const entityTrends = new Map<EntityId, number[]>(PROFILES.map((p) => [p.entity, []]))
  const SPARKLINE_DAYS = 14
  let thisMonthTotal = 0
  let lastMonthTotal = 0

  for (let offset = GENERATION_WINDOW_DAYS; offset >= 0; offset--) {
    const date = subDays(today, offset)
    const dateKey = format(date, 'yyyy-MM-dd')
    const monthKey = format(date, 'yyyy-MM')
    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    const inSparklineWindow = offset < SPARKLINE_DAYS

    let dayTotal = 0
    const dayByCategory = new Map<Category['key'], number>()
    for (const profile of PROFILES) {
      const noise = (rng() - 0.5) * 2 * profile.variance
      const weekendAdj = isWeekend ? profile.weekendMultiplier : 1
      const amount = Math.max(0, Math.round((profile.baseDaily + noise) * weekendAdj))
      dayTotal += amount
      categoryTotals.set(profile.category, (categoryTotals.get(profile.category) ?? 0) + amount)
      entityTotals.set(profile.entity, (entityTotals.get(profile.entity) ?? 0) + amount)
      dayByCategory.set(profile.category, (dayByCategory.get(profile.category) ?? 0) + amount)

      if (inSparklineWindow) entityTrends.get(profile.entity)!.push(amount)
      if (monthKey === currentMonthKey) thisMonthTotal += amount
      if (monthKey === lastMonthKey) lastMonthTotal += amount
    }
    if (inSparklineWindow) {
      for (const c of CATEGORIES) categoryTrends.get(c.key)!.push(dayByCategory.get(c.key) ?? 0)
    }
    dailyTotals.set(dateKey, dayTotal)
  }

  const trailing90 = Array.from(dailyTotals.entries())
    .slice(-90)
    .map(([date, amount]) => ({ date, amount }))

  const categories = CATEGORIES.map((c) => ({
    category: c.key,
    label: c.label,
    amount: categoryTotals.get(c.key) ?? 0,
    trend: categoryTrends.get(c.key) ?? [],
  }))

  const byEntity = PROFILES.map((p) => p.entity).map((entity) => ({
    entity,
    amount: entityTotals.get(entity) ?? 0,
    trend: entityTrends.get(entity) ?? [],
  }))

  return { thisMonthTotal, lastMonthTotal, trailing90, categories, byEntity }
}

export async function getRevenueData(): Promise<RevenueData> {
  if (getSourceMode('notion') === 'live') {
    throw new Error('Live revenue tracking not yet implemented — set VITE_NOTION_MODE=mock')
  }
  await mockDelay()
  return revenueMock()
}
