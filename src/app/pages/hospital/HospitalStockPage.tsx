import { MINIMUM_STOCK_PER_GROUP, useBloodStock } from '@/features/blood-stock'
import type { StatusTone } from '@/shared/types/status-tone'
import { StatusBadge } from '@/shared/ui'

import { toStockGroups } from './view-model'

const TONE_BORDER: Record<StatusTone, string> = {
  success: 'border-border',
  info: 'border-border',
  warning: 'border-warning/40',
  danger: 'border-danger/40',
  neutral: 'border-border',
}

/** RS-02: ketersediaan darah real time per golongan darah. */
export function HospitalStockPage() {
  const { summary } = useBloodStock()
  const groups = toStockGroups(summary.groups)

  return (
    <section>
      <div className="mb-8">
        <p className="text-sm font-semibold text-primary">Ketersediaan real time</p>
        <h1 className="mt-1 text-3xl font-bold text-heading">Stok Darah</h1>
        <p className="mt-2 text-sm text-muted">
          Pantau ketersediaan kantong darah terbaru dari UTD.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {groups.map((group) => (
          <article
            className={`rounded-2xl border bg-surface p-5 ${TONE_BORDER[group.tone]}`}
            key={group.bloodType}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary-50 text-lg font-bold text-primary">
                {group.bloodType}
              </span>
              <StatusBadge label={group.statusLabel} tone={group.tone} />
            </div>
            <p className="mt-5 text-3xl font-bold text-heading">{group.amount}</p>
            <p className="text-xs text-muted">kantong tersedia</p>
            <p className="mt-3 text-[11px] font-semibold text-muted">
              Rh+{' '}
              <span className={group.positiveLow ? 'text-danger' : undefined}>{group.positive}</span>
              {' · '}Rh−{' '}
              <span className={group.negativeLow ? 'text-danger' : undefined}>{group.negative}</span>
            </p>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <article className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-xs font-semibold text-muted">Total kantong</p>
          <p className="mt-1 text-2xl font-bold text-heading">{summary.total}</p>
        </article>
        <article className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-xs font-semibold text-muted">Hampir expired</p>
          <p className="mt-1 text-2xl font-bold text-warning">{summary.expiringSoon}</p>
        </article>
        <article className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-xs font-semibold text-muted">Sudah expired</p>
          <p className="mt-1 text-2xl font-bold text-danger">{summary.expired}</p>
        </article>
      </div>

      <p className="mt-4 text-xs text-muted">
        Golongan dengan total di bawah {MINIMUM_STOCK_PER_GROUP} kantong ditandai kritis. Angka Rh
        berwarna merah menandakan stok rhesus tersebut di bawah batas minimum yang sama.
      </p>
    </section>
  )
}
