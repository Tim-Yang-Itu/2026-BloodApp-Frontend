import type { ReactNode } from 'react'

export type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

interface StatusBadgeProps {
  readonly tone?: BadgeTone
  readonly children: ReactNode
}

/** Label status ringkas dengan warna sesuai tingkat kepentingan. */
export const StatusBadge = ({ tone = 'neutral', children }: StatusBadgeProps) => (
  <span className={`badge badge--${tone}`}>{children}</span>
)
