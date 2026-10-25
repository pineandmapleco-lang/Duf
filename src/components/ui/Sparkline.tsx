import { Line, LineChart, ResponsiveContainer } from 'recharts'

export function Sparkline({ data, color = '#d4af6a' }: { data: number[]; color?: string }) {
  if (data.length < 2) return null
  const points = data.map((amount, i) => ({ i, amount }))
  return (
    <div className="h-8 w-full" aria-hidden="true">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={points} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
          <Line type="monotone" dataKey="amount" stroke={color} strokeWidth={1.75} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
