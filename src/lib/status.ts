import type { StatusLevel } from '../types/dashboard'

export const STATUS_STYLES: Record<StatusLevel, { bg: string; border: string; text: string; dot: string; label: string }> = {
  good: {
    bg: 'bg-mp-status-good-bg',
    border: 'border-mp-status-good-border',
    text: 'text-mp-status-good',
    dot: 'bg-mp-status-good',
    label: 'On track',
  },
  warn: {
    bg: 'bg-mp-status-warn-bg',
    border: 'border-mp-status-warn-border',
    text: 'text-mp-status-warn',
    dot: 'bg-mp-status-warn',
    label: 'At risk',
  },
  bad: {
    bg: 'bg-mp-status-bad-bg',
    border: 'border-mp-status-bad-border',
    text: 'text-mp-status-bad',
    dot: 'bg-mp-status-bad',
    label: 'Blocked',
  },
}
