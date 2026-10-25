import { useMemo, useState } from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useDashboard } from '../../context/DashboardContext'
import { SectionShell } from '../ui/SectionShell'
import { Panel } from '../ui/Panel'
import { Sparkline } from '../ui/Sparkline'
import { LoadingBlock } from '../ui/LoadingBlock'
import { EmptyState } from '../ui/EmptyState'
import { formatCurrency, formatMonthDay, formatPercent } from '../../lib/format'
import { useCountUp } from '../../hooks/useCountUp'
import { ENTITIES } from '../../types/dashboard'

type View = 'unified' | 'entity'

function ChangeBadge({ current, previous }: { current: number; previous: number }) {
  if (previous <= 0) return null
  const delta = ((current - previous) / previous) * 100
  const up = delta >= 0
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold ${
        up ? 'bg-mp-status-good-bg text-mp-status-good' : 'bg-mp-status-bad-bg text-mp-status-bad'
      }`}
    >
      <span aria-hidden="true">{up ? '▲' : '▼'}</span>
      {up ? 'Up' : 'Down'} {Math.abs(delta).toFixed(1)}% vs last month
    </span>
  )
}

export function RevenueSection() {
  const { data, loading, lastUpdated } = useDashboard()
  const [view, setView] = useState<View>('unified')

  const grandTotal = useMemo(() => {
    if (!data) return 0
    return data.revenue.categories.reduce((sum, c) => sum + c.amount, 0)
  }, [data])

  const chartData = useMemo(() => {
    if (!data) return []
    return data.revenue.trailing90.map((p) => ({ ...p, label: formatMonthDay(p.date) }))
  }, [data])

  const animatedThisMonth = useCountUp(data?.revenue.thisMonthTotal ?? 0)

  return (
    <SectionShell
      id="revenue"
      title="Revenue Overview"
      description="Unified across book/IP sales, client work, product sales, and AI consulting."
      lastUpdated={lastUpdated}
      accent="gold"
    >
      {loading && !data ? (
        <LoadingBlock rows={3} label="Loading revenue" />
      ) : !data ? (
        <EmptyState title="Revenue data unavailable" description="Check the Notion revenue tracker connection." />
      ) : (
        <Panel accent="gold" className="p-5 sm:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-mp-text-faint">This month (month to date)</p>
              <div className="mt-1 flex flex-wrap items-baseline gap-3">
                <span className="text-3xl font-extrabold tracking-tight text-mp-gold-strong tabular-nums sm:text-4xl">
                  {formatCurrency(animatedThisMonth)}
                </span>
                <ChangeBadge current={data.revenue.thisMonthTotal} previous={data.revenue.lastMonthTotal} />
              </div>
              <p className="mt-1 text-xs text-mp-text-muted">
                Last month: {formatCurrency(data.revenue.lastMonthTotal)}
              </p>
            </div>

            <div
              role="group"
              aria-label="Revenue breakdown view"
              className="flex w-fit items-center gap-1 rounded-lg border border-mp-border bg-mp-bg-raised p-1"
            >
              {(['unified', 'entity'] as View[]).map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={view === v}
                  onClick={() => setView(v)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    view === v ? 'bg-mp-gold-bg text-mp-gold-strong' : 'text-mp-text-muted hover:text-mp-text'
                  }`}
                >
                  {v === 'unified' ? 'Unified' : 'By Entity'}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 h-48 w-full sm:h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d4af6a" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#d4af6a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="label"
                  tick={{ fill: '#656d7a', fontSize: 11 }}
                  axisLine={{ stroke: '#262b34' }}
                  tickLine={false}
                  interval={13}
                />
                <YAxis
                  tick={{ fill: '#656d7a', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${v >= 1000 ? `${Math.round(v / 1000)}k` : v}`}
                  width={44}
                />
                <Tooltip
                  contentStyle={{
                    background: '#14171d',
                    border: '1px solid #262b34',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: '#9aa1ad' }}
                  formatter={(value) => [formatCurrency(Number(value)), 'Revenue']}
                />
                <Area type="monotone" dataKey="amount" stroke="#d4af6a" strokeWidth={2} fill="url(#revenueFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-1 text-xs text-mp-text-faint">Trailing 90 days</p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {view === 'unified'
              ? data.revenue.categories.map((c) => (
                  <div key={c.category} className="rounded-lg border border-mp-gold-border/60 bg-mp-money-bg px-3 py-2.5">
                    <p className="text-xs text-mp-text-muted">{c.label}</p>
                    <p className="mt-1 text-base font-bold text-mp-text">{formatCurrency(c.amount)}</p>
                    <p className="text-[11px] text-mp-gold">{formatPercent(c.amount, grandTotal)} of total</p>
                    <Sparkline data={c.trend} />
                  </div>
                ))
              : data.revenue.byEntity.map((e) => (
                  <div key={e.entity} className="rounded-lg border border-mp-gold-border/60 bg-mp-money-bg px-3 py-2.5">
                    <p className="text-xs text-mp-text-muted">{ENTITIES[e.entity].shortName}</p>
                    <p className="mt-1 text-base font-bold text-mp-text">{formatCurrency(e.amount)}</p>
                    <p className="text-[11px] text-mp-gold">{formatPercent(e.amount, grandTotal)} of total</p>
                    <Sparkline data={e.trend} />
                  </div>
                ))}
          </div>
        </Panel>
      )}
    </SectionShell>
  )
}
