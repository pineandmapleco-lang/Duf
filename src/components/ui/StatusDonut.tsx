import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import type { StatusLevel } from '../../types/dashboard'
import { STATUS_HEX, STATUS_STYLES } from '../../lib/status'

const ORDER: StatusLevel[] = ['good', 'warn', 'bad']

/**
 * Compact status-distribution donut: counts rendered as a Recharts pie plus
 * a text legend with the same dot+label convention as StatusBadge, so the
 * chart never relies on color alone to communicate the breakdown.
 */
export function StatusDonut({ counts, label = 'Total' }: { counts: Record<StatusLevel, number>; label?: string }) {
  const total = counts.good + counts.warn + counts.bad
  const data = ORDER.filter((level) => counts[level] > 0).map((level) => ({ level, value: counts[level] }))

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-20 w-20 flex-none">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data.length > 0 ? data : [{ level: 'good', value: 1 }]}
              dataKey="value"
              nameKey="level"
              innerRadius={26}
              outerRadius={38}
              startAngle={90}
              endAngle={-270}
              stroke="none"
              isAnimationActive={false}
            >
              {(data.length > 0 ? data : [{ level: 'good' as const, value: 1 }]).map((entry) => (
                <Cell key={entry.level} fill={data.length > 0 ? STATUS_HEX[entry.level] : '#262b34'} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-base font-bold text-mp-text tabular-nums">{total}</span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-medium uppercase tracking-wide text-mp-text-faint">{label}</span>
        {ORDER.map((level) => (
          <div key={level} className="flex items-center gap-1.5 text-xs text-mp-text-muted">
            <span className={`h-1.5 w-1.5 rounded-full ${STATUS_STYLES[level].dot}`} aria-hidden="true" />
            <span className="tabular-nums">{counts[level]}</span>
            <span>{STATUS_STYLES[level].label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
