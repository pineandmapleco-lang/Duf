import type { ReactNode } from 'react'

export function Panel({
  children,
  className = '',
  accent = 'default',
  as: As = 'div',
}: {
  children: ReactNode
  className?: string
  accent?: 'default' | 'gold'
  as?: 'div' | 'article'
}) {
  const accentClasses =
    accent === 'gold'
      ? 'border-mp-gold-border bg-mp-money-panel'
      : 'border-mp-border bg-mp-panel'
  return (
    <As className={`rounded-xl border ${accentClasses} ${className}`}>
      {children}
    </As>
  )
}
