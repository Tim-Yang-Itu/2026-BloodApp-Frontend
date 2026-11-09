import { CircleSlash, CircleCheck, Clock3, Inbox, RefreshCw } from 'lucide-react'

import { useBloodRequests } from '@/features/blood-request'
import { StatusBadge } from '@/shared/ui'

import { StatCard } from '../components/StatCard'

/** RS-04/RS-06: pelacakan status permintaan darah rumah sakit. */
export function HospitalRequestsSection() {
  const { requests, isLoading, error, reload } = useBloodRequests()

  const pendingCount = requests.filter((request) => request.status === 'pending').length
  const approvedCount = requests.filter((request) => request.status === 'approved').length
  const rejectedCount = requests.filter((request) => request.status === 'rejected').length

  return (
    <section>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">Pelacakan pengajuan</p>
          <h1 className="mt-1 text-3xl font-bold text-heading">Permintaan Darah</h1>
          <p className="mt-2 text-sm text-muted">
            Pantau status seluruh permintaan darah yang diajukan.
          </p>
        </div>
        <button
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-bold text-foreground hover:bg-surface-muted"
          onClick={reload}
          type="button"
        >
          <RefreshCw aria-hidden="true" className="size-4" />
          Muat ulang
        </button>
      </div>

      <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Clock3}
          label="Menunggu approval"
          tone="warning"
          value={`${pendingCount} Permintaan`}
        />
        <StatCard
          icon={CircleCheck}
          label="Telah disetujui"
          tone="success"
          value={`${approvedCount} Permintaan`}
        />
        <StatCard
          icon={CircleSlash}
          label="Ditolak"
          tone="danger"
          value={`${rejectedCount} Permintaan`}
        />
        <StatCard
          icon={Inbox}
          label="Total pengajuan"
          tone="primary"
          value={`${requests.length} Permintaan`}
        />
      </div>

      {error ? (
        <p className="mb-4 rounded-xl border border-danger/40 bg-danger/5 px-4 py-3 text-sm text-danger">
          {error}
        </p>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-surface-muted text-xs text-muted">
              <tr>
                <th className="px-5 py-4 font-semibold">ID Permintaan</th>
                <th className="px-5 py-4 font-semibold">Rumah Sakit</th>
                <th className="px-5 py-4 font-semibold">Golongan</th>
                <th className="px-5 py-4 font-semibold">Jumlah</th>
                <th className="px-5 py-4 font-semibold">Urgensi</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td className="px-5 py-6 text-muted" colSpan={7}>
                    Memuat data permintaan…
                  </td>
                </tr>
              ) : null}

              {!isLoading && requests.length === 0 ? (
                <tr>
                  <td className="px-5 py-6 text-muted" colSpan={7}>
                    Belum ada permintaan darah.
                  </td>
                </tr>
              ) : null}

              {requests.map((request) => (
                <tr className="text-label" key={request.id}>
                  <td className="px-5 py-4 font-bold text-heading">{request.id}</td>
                  <td className="px-5 py-4">{request.hospitalName}</td>
                  <td className="px-5 py-4 font-bold text-primary">{request.bloodLabel}</td>
                  <td className="px-5 py-4">{request.quantity} kantong</td>
                  <td className="px-5 py-4">{request.urgencyLabel}</td>
                  <td className="px-5 py-4">
                    <StatusBadge label={request.statusLabel} tone={request.statusTone} />
                  </td>
                  <td className="px-5 py-4 text-xs text-muted">{request.requestedAtLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
