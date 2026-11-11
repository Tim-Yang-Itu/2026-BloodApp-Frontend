import type { LucideIcon } from 'lucide-react'

export type StatTone = 'primary' | 'success' | 'warning' | 'danger' | 'info'

const TONE_CLASS: Record<StatTone, string> = {
  primary: 'bg-primary-50 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-danger/10 text-danger',
  info: 'bg-info/10 text-info',
}

type StatCardProps = {
  icon: LucideIcon
  label: string
  /** Angka utama sudah diformat, mis. `12 kantong`. */
  value: string
  /** Keterangan kecil di bawah angka. */
  note?: string
  tone?: StatTone
}

/** Kartu angka ringkasan yang dipakai di semua dashboard peran. */
export function StatCard({ icon: Icon, label, value, note, tone = 'primary' }: StatCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-surface p-5 shadow-field">
      <div className="flex items-start justify-between gap-3">
        <p className="m-0 text-xs font-semibold text-muted">{label}</p>
        <span className={`grid size-9 shrink-0 place-items-center rounded-full ${TONE_CLASS[tone]}`}>
          <Icon aria-hidden="true" className="size-4" />
        </span>
      </div>
      <p className="mt-3 mb-0 text-3xl leading-none font-extrabold text-heading">{value}</p>
      {note ? <p className="mt-1.5 mb-0 text-[11px] text-muted">{note}</p> : null}
    </article>
  )
}
