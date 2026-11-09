import { CheckCircle2, ClipboardList, XCircle } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Button, StatusBadge, controlClass, labelClass } from '@/shared/ui'

import type { BloodRequestDto } from '../../application/dto/blood-request.dto'
import type { BloodRequestStatus } from '../../domain/entities/blood-request'
import { REQUEST_STATUSES } from '../../domain/entities/blood-request'
import { REQUEST_STATUS_LABEL } from '../../domain/enums/request-status'
import { bloodRequestErrorMessage } from '../../domain/errors/blood-request-error'
import { useBloodRequests } from '../hooks/use-blood-requests'

type StatusFilter = 'all' | BloodRequestStatus

const FILTERS: readonly { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'Semua' },
  ...REQUEST_STATUSES.map((status) => ({
    value: status as StatusFilter,
    label: REQUEST_STATUS_LABEL[status],
  })),
]

type BloodRequestsPageProps = {
  /** Jumlah kantong tersedia per label darah, mis. `{ 'O+': 30 }`. */
  stockAvailability?: Readonly<Record<string, number>>
}

function countByStatus(requests: readonly BloodRequestDto[], status: StatusFilter): number {
  if (status === 'all') {
    return requests.length
  }

  return requests.filter((request) => request.status === status).length
}

/** UTD-05 / UTD-06: verifikasi, persetujuan, dan penolakan permintaan RS. */
export function BloodRequestsPage({ stockAvailability }: BloodRequestsPageProps) {
  const { requests, isLoading, error, approve, reject } = useBloodRequests()
  const [filter, setFilter] = useState<StatusFilter>('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [reason, setReason] = useState('')
  const [actionError, setActionError] = useState<string | null>(null)
  const [isActing, setIsActing] = useState(false)

  const filteredRequests = useMemo(() => {
    if (filter === 'all') {
      return requests
    }

    return requests.filter((request) => request.status === filter)
  }, [filter, requests])

  const selected = filteredRequests.find((request) => request.id === selectedId) ?? filteredRequests[0] ?? null
  const selectedIdValue = selected?.id ?? null

  const availableCount =
    selected && stockAvailability ? stockAvailability[selected.bloodLabel] : undefined
  const isStockEnough = selected ? (availableCount ?? 0) >= selected.quantity : false

  function selectRequest(requestId: string) {
    setSelectedId(requestId)
    setReason('')
    setActionError(null)
  }

  function changeFilter(nextFilter: StatusFilter) {
    setFilter(nextFilter)
    setReason('')
    setActionError(null)
  }

  async function runAction(action: () => Promise<void>) {
    setActionError(null)
    setIsActing(true)

    try {
      await action()
    } catch (caught) {
      setActionError(bloodRequestErrorMessage(caught))
    } finally {
      setIsActing(false)
    }
  }

  return (
    <div className="w-full px-6 py-8 pb-16 lg:px-8">
      <header>
        <h1 className="m-0 text-3xl font-bold tracking-[-0.02em] text-heading">
          Permintaan Rumah Sakit
        </h1>
        <p className="mt-1.5 mb-0 text-sm text-muted">
          Verifikasi permintaan sebelum menyetujui pengeluaran kantong darah.
        </p>
      </header>

      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((item) => {
          const isActive = item.value === filter

          return (
            <button
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition-colors ${
                isActive
                  ? 'border-primary-200 bg-primary-50 text-primary-800'
                  : 'border-border bg-surface text-label hover:bg-surface-muted'
              }`}
              key={item.value}
              onClick={() => changeFilter(item.value)}
              type="button"
            >
              {item.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                  isActive ? 'bg-primary text-on-primary' : 'bg-surface-highlight text-muted'
                }`}
              >
                {countByStatus(requests, item.value)}
              </span>
            </button>
          )
        })}
      </div>

      {error ? (
        <p
          className="mt-6 rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-field">
          <div className="border-b border-border px-5 py-4">
            <h2 className="m-0 text-lg font-bold text-heading">Daftar permintaan</h2>
            <p className="mt-1 mb-0 text-xs text-muted">
              {filteredRequests.length} permintaan pada filter ini
            </p>
          </div>

          {isLoading ? (
            <p className="m-0 px-5 py-10 text-sm text-muted">Memuat permintaan…</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-sm">
                <thead>
                  <tr className="text-left text-[11px] font-semibold tracking-[0.08em] text-muted uppercase">
                    <th className="border-b border-border px-4 py-3 font-semibold">ID</th>
                    <th className="border-b border-border px-4 py-3 font-semibold">Rumah Sakit</th>
                    <th className="border-b border-border px-4 py-3 font-semibold">Darah</th>
                    <th className="border-b border-border px-4 py-3 font-semibold">Jumlah</th>
                    <th className="border-b border-border px-4 py-3 font-semibold">Tanggal</th>
                    <th className="border-b border-border px-4 py-3 font-semibold">Status</th>
                    <th className="border-b border-border px-4 py-3 text-right font-semibold">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.length === 0 ? (
                    <tr>
                      <td className="px-5 py-10 text-center text-sm text-muted" colSpan={7}>
                        Belum ada permintaan pada filter ini.
                      </td>
                    </tr>
                  ) : (
                    filteredRequests.map((request) => {
                      const isSelected = request.id === selectedIdValue

                      return (
                        <tr
                          className={`cursor-pointer transition-colors ${
                            isSelected ? 'bg-primary-50/70' : 'hover:bg-surface-muted/60'
                          }`}
                          key={request.id}
                          onClick={() => selectRequest(request.id)}
                        >
                          <td className="border-b border-border px-4 py-3 font-bold text-foreground">
                            {request.id}
                          </td>
                          <td className="border-b border-border px-4 py-3 text-foreground">
                            {request.hospitalName}
                          </td>
                          <td className="border-b border-border px-4 py-3">
                            <span className="inline-flex items-center rounded-md bg-primary-50 px-2 py-1 text-xs font-bold text-primary-800">
                              {request.bloodLabel}
                            </span>
                          </td>
                          <td className="border-b border-border px-4 py-3 text-foreground">
                            {request.quantity}
                          </td>
                          <td className="border-b border-border px-4 py-3 text-xs text-muted">
                            {request.requestedAtLabel}
                          </td>
                          <td className="border-b border-border px-4 py-3">
                            <StatusBadge
                              label={request.statusLabel}
                              tone={request.statusTone}
                            />
                          </td>
                          <td className="border-b border-border px-4 py-3 text-right">
                            <button
                              className="cursor-pointer border-0 bg-transparent p-0 text-xs font-bold text-primary hover:text-primary-800"
                              onClick={(event) => {
                                event.stopPropagation()
                                selectRequest(request.id)
                              }}
                              type="button"
                            >
                              Detail
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <aside className="h-fit rounded-2xl border border-border bg-surface p-5 shadow-field">
          <div className="flex items-center justify-between gap-3">
            <h2 className="m-0 text-lg font-bold text-heading">Detail permintaan</h2>
            {selected ? (
              <StatusBadge label={selected.statusLabel} tone={selected.statusTone} />
            ) : null}
          </div>

          {selected ? (
            <>
              <div className="mt-4 flex items-center gap-3 rounded-xl bg-surface-muted p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-on-primary">
                  {selected.bloodLabel}
                </span>
                <div>
                  <p className="m-0 text-sm font-bold text-foreground">{selected.hospitalName}</p>
                  <p className="m-0 text-xs text-muted">
                    {selected.id} • {selected.quantity} kantong
                  </p>
                </div>
              </div>

              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-muted">Rumah sakit</dt>
                  <dd className="m-0 text-right font-semibold text-foreground">
                    {selected.hospitalName}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-muted">Golongan darah</dt>
                  <dd className="m-0 text-right font-semibold text-foreground">
                    {selected.bloodLabel}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-muted">Jumlah diminta</dt>
                  <dd className="m-0 text-right font-semibold text-foreground">
                    {selected.quantity} kantong
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-muted">Urgensi</dt>
                  <dd className="m-0 text-right font-semibold text-foreground">
                    {selected.urgencyLabel}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-muted">Waktu masuk</dt>
                  <dd className="m-0 text-right font-semibold text-foreground">
                    {selected.requestedAtLabel}
                  </dd>
                </div>
              </dl>

              <div className="mt-4 rounded-xl border border-border bg-surface-muted p-4">
                <p className="m-0 flex items-center gap-2 text-xs font-bold text-label">
                  <ClipboardList aria-hidden="true" className="size-4 text-muted" />
                  Cek stok
                </p>
                <p className="mt-1.5 mb-0 font-display text-2xl font-bold text-heading">
                  {availableCount === undefined ? '—' : availableCount}{' '}
                  <span className="font-sans text-xs font-normal text-muted">
                    kantong {selected.bloodLabel} tersedia
                  </span>
                </p>
                {availableCount === undefined ? null : (
                  <div className="mt-2">
                    <StatusBadge
                      label={isStockEnough ? 'Stok cukup' : 'Stok kurang'}
                      tone={isStockEnough ? 'success' : 'danger'}
                    />
                  </div>
                )}
              </div>

              {selected.canDecide ? (
                <>
                  <div className="mt-4">
                    <label className={labelClass} htmlFor="rejection-reason">
                      Alasan penolakan
                    </label>
                    <textarea
                      className={`${controlClass} min-h-24 resize-y`}
                      id="rejection-reason"
                      onChange={(event) => setReason(event.target.value)}
                      placeholder="Wajib diisi jika permintaan ditolak"
                      value={reason}
                    />
                  </div>

                  {actionError ? (
                    <p
                      className="mt-3 mb-0 rounded-lg border border-danger/30 bg-danger/5 px-3 py-2 text-xs text-danger"
                      role="alert"
                    >
                      {actionError}
                    </p>
                  ) : null}

                  <div className="mt-4 flex items-center gap-3">
                    <Button
                      className="flex-1"
                      disabled={isActing}
                      onClick={() =>
                        void runAction(() => reject(selected.id, reason))
                      }
                      variant="outline"
                    >
                      <XCircle aria-hidden="true" className="size-4" />
                      Tolak
                    </Button>
                    <Button
                      className="flex-1"
                      disabled={isActing}
                      onClick={() => void runAction(() => approve(selected.id))}
                    >
                      <CheckCircle2 aria-hidden="true" className="size-4" />
                      Setujui
                    </Button>
                  </div>
                </>
              ) : (
                <div className="mt-4 rounded-lg border border-border bg-surface-muted px-4 py-3 text-xs leading-relaxed text-muted">
                  Permintaan ini sudah{' '}
                  <span className="font-bold text-foreground">
                    {REQUEST_STATUS_LABEL[selected.status].toLowerCase()}
                  </span>
                  . Keputusan tidak dapat diubah lagi.
                  {selected.rejectionReason ? (
                    <p className="mt-2 mb-0">
                      <span className="font-semibold text-foreground">Alasan penolakan: </span>
                      {selected.rejectionReason}
                    </p>
                  ) : null}
                </div>
              )}
            </>
          ) : (
            <p className="mt-6 mb-0 text-sm text-muted">
              Pilih salah satu permintaan untuk melihat detail.
            </p>
          )}
        </aside>
      </div>
    </div>
  )
}
