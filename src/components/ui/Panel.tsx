import type { ReactNode, Ref } from 'react'

export function Panel({
  children,
  className = '',
  accent = 'default',
  as: As = 'div',
  hover = false,
  ref,
}: {
  children: ReactNode
  className?: string
  accent?: 'default' | 'gold'
  as?: 'div' | 'article'
  /** Adds a lift + glow on hover — use for clickable/interactive cards, not static containers. */
  hover?: boolean
  ref?: Ref<HTMLDivElement>
}) {
  const accentClasses =
    accent === 'gold'
      ? 'border-mp-gold-border bg-mp-money-panel shadow-[0_1px_0_0_rgba(232,201,136,0.07)_inset,0_10px_24px_-12px_rgba(0,0,0,0.6)]'
      : 'border-mp-border bg-mp-panel shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_10px_24px_-12px_rgba(0,0,0,0.6)]'
  const hoverClasses = hover
    ? 'transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-mp-accent-border hover:shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_16px_32px_-14px_rgba(0,0,0,0.7)]'
    : ''
  return (
    <As ref={ref} className={`rounded-xl border ${accentClasses} ${hoverClasses} ${className}`}>
      {children}
    </As>
  )
}
