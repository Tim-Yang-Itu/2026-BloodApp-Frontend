import type { BloodRequestDto } from '@/features/blood-request'
import { StatusBadge } from '@/shared/ui'

type RecentRequestsCardProps = {
  requests: readonly BloodRequestDto[]
  onViewAll: () => void
}

/** Permintaan darah terbaru (data dari fitur `blood-request`). */
export function RecentRequestsCard({ requests, onViewAll }: RecentRequestsCardProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-heading">Permintaan terbaru</h2>
          <p className="mt-1 text-xs text-muted">Aktivitas permintaan darah terakhir</p>
        </div>
        <button
          className="cursor-pointer text-xs font-bold text-primary hover:underline"
          onClick={onViewAll}
          type="button"
        >
          Lihat semua
        </button>
      </div>

      <div className="mt-5 divide-y divide-border">
        {requests.length === 0 ? (
          <p className="text-sm text-muted">Belum ada permintaan darah.</p>
        ) : (
          requests.map((request) => (
            <div className="flex items-center gap-3 py-4 first:pt-0 last:pb-0" key={request.id}>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-sm font-bold text-primary">
                {request.bloodLabel}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-heading">{request.hospitalName}</p>
                <p className="mt-0.5 text-xs text-muted">
                  {request.id} · {request.quantity} kantong · {request.urgencyLabel}
                </p>
              </div>
              <div className="text-right">
                <StatusBadge label={request.statusLabel} tone={request.statusTone} />
                <p className="mt-1 text-[10px] text-muted">{request.requestedAtLabel}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
