import { ArrowUpRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const TONE_CLASS = {
  primary: 'bg-primary-50 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-danger/10 text-danger',
} as const

type StatCardProps = {
  label: string
  value: string
  note?: string
  icon: LucideIcon
  tone: keyof typeof TONE_CLASS
}

/** Kartu angka ringkasan di dashboard Admin RS. */
export function StatCard({ label, value, note, icon: Icon, tone }: StatCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between">
        <span
          className={`flex size-10 items-center justify-center rounded-xl ${TONE_CLASS[tone]}`}
        >
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <ArrowUpRight aria-hidden="true" className="size-4 text-muted" />
      </div>
      <p className="mt-5 text-sm text-muted">{label}</p>
      <p className="mt-1 text-3xl font-bold text-heading">{value}</p>
      {note ? <p className="mt-2 text-xs text-muted">{note}</p> : null}
    </article>
  )
}
