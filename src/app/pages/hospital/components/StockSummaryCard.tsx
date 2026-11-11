import type { StatusTone } from '@/shared/types/status-tone'

import type { StockGroupView } from '../view-model'

const BAR_CLASS: Record<StatusTone, string> = {
  success: 'bg-success',
  info: 'bg-info',
  warning: 'bg-warning',
  danger: 'bg-danger',
  neutral: 'bg-border-strong',
}

const LABEL_CLASS: Record<StatusTone, string> = {
  success: 'text-success',
  info: 'text-info',
  warning: 'text-warning',
  danger: 'text-danger',
  neutral: 'text-muted',
}

type StockSummaryCardProps = {
  groups: readonly StockGroupView[]
  onViewAll: () => void
}

/** Ringkasan stok per golongan darah (data dari fitur `blood-stock`). */
export function StockSummaryCard({ groups, onViewAll }: StockSummaryCardProps) {
  const maxAmount = Math.max(1, ...groups.map((group) => group.amount))

  return (
    <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-heading font-sans">Ringkasan stok</h2>
          <p className="mt-1 text-xs text-muted">Ketersediaan kantong darah saat ini</p>
        </div>
        <button
          className="cursor-pointer text-xs font-bold text-primary hover:underline"
          onClick={onViewAll}
          type="button"
        >
          Lihat semua
        </button>
      </div>

      <div className="mt-6 space-y-5">
        {groups.map((group) => (
          <div key={group.bloodType}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-bold text-heading">{group.bloodType}</span>
              <span className="font-semibold text-heading">
                {group.amount} <span className="font-normal text-muted">kantong</span>
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-highlight">
              <div
                className={`h-full rounded-full ${BAR_CLASS[group.tone]}`}
                style={{ width: `${Math.round((group.amount / maxAmount) * 100)}%` }}
              />
            </div>
            <p className={`mt-1.5 text-[11px] font-semibold ${LABEL_CLASS[group.tone]}`}>
              {group.statusLabel} · Rh+{' '}
              <span className={group.positiveLow ? 'text-danger' : undefined}>{group.positive}</span> ·
              Rh−{' '}
              <span className={group.negativeLow ? 'text-danger' : undefined}>{group.negative}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
