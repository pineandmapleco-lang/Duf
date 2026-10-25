import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

export interface MiniDonutSlice {
  key: string
  label: string
  value: number
  color: string
  dotClassName: string
}

/** Generic small donut + legend, for breakdowns that aren't the good/warn/bad status palette. */
export function MiniDonut({ slices, centerLabel }: { slices: MiniDonutSlice[]; centerLabel?: string }) {
  const total = slices.reduce((sum, s) => sum + s.value, 0)
  const data = slices.filter((s) => s.value > 0)

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-20 w-20 flex-none">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data.length > 0 ? data : [{ key: 'empty', value: 1 }]}
              dataKey="value"
              nameKey="key"
              innerRadius={26}
              outerRadius={38}
              startAngle={90}
              endAngle={-270}
              stroke="none"
              isAnimationActive={false}
            >
              {(data.length > 0 ? data : [{ key: 'empty', color: '#262b34' }]).map((entry) => (
                <Cell key={entry.key} fill={'color' in entry ? entry.color : '#262b34'} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-base font-bold text-mp-text tabular-nums">{total}</span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {centerLabel && <span className="text-[11px] font-medium uppercase tracking-wide text-mp-text-faint">{centerLabel}</span>}
        {slices.map((s) => (
          <div key={s.key} className="flex items-center gap-1.5 text-xs text-mp-text-muted">
            <span className={`h-1.5 w-1.5 rounded-full ${s.dotClassName}`} aria-hidden="true" />
            <span className="tabular-nums">{s.value}</span>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
