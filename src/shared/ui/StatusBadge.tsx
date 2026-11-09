import type { StatusTone } from '@/shared/types/status-tone'

const TONE_CLASS: Record<StatusTone, string> = {
  success: 'bg-success/10 text-success',
  info: 'bg-info/10 text-info',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-danger/10 text-danger',
  neutral: 'bg-surface-highlight text-muted',
}

type StatusBadgeProps = {
  label: string
  tone: StatusTone
  className?: string
}

/** Chip status kecil dengan nada warna dari design token. */
export function StatusBadge({ label, tone, className = '' }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold whitespace-nowrap ${TONE_CLASS[tone]} ${className}`}
    >
      {label}
    </span>
  )
}
