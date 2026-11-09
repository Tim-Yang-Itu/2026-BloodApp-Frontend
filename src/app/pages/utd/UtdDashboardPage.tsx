import { AlertCircle, Clock, Droplet, Inbox } from 'lucide-react'
import { Link } from 'react-router-dom'

import {
  MINIMUM_STOCK_PER_GROUP,
  useBloodStock,
} from '@/features/blood-stock'
import { useBloodRequests } from '@/features/blood-request'
import { StatusBadge } from '@/shared/ui'

import type { StockBagDto } from '@/features/blood-stock'

const STAT_TONE = {
  primary: 'bg-primary-50 text-primary',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-danger/10 text-danger',
  info: 'bg-info/10 text-info',
} as const

type StatCardProps = {
  label: string
  value: number
  unit: string
  hint: string
  icon: typeof Droplet
  tone: keyof typeof STAT_TONE
}

function StatCard({ label, value, unit, hint, icon: Icon, tone }: StatCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-surface p-5 shadow-field">
      <div className="flex items-start justify-between gap-3">
        <p className="m-0 text-xs font-semibold text-muted">{label}</p>
        <span className={`grid size-8 shrink-0 place-items-center rounded-full ${STAT_TONE[tone]}`}>
          <Icon aria-hidden="true" className="size-4" />
        </span>
      </div>
      <p className="mt-3 mb-0 flex items-baseline gap-1.5 text-3xl leading-none font-extrabold text-heading">
        {value}
        <span className="text-xs font-medium text-muted">{unit}</span>
      </p>
      <p className="mt-1.5 mb-0 text-[11px] text-muted">{hint}</p>
    </article>
  )
}

function expiringLabel(bag: StockBagDto): string {
  return `${bag.daysUntilExpiry} hari`
}

function activityTime(value: string): string {
  const [day] = value.split(' • ')

  return day
}

/** Dashboard UTD: ringkasan stok, peringatan expired, dan permintaan RS terbaru. */
export function UtdDashboardPage() {
  const { bags, summary, isLoading: isStockLoading } = useBloodStock()
  const { requests, isLoading: isRequestsLoading } = useBloodRequests()

  const pendingCount = requests.filter((request) => request.status === 'pending').length
  const maxGroupTotal = Math.max(1, ...summary.groups.map((group) => group.total))
  const expiringBags = bags
    .filter((bag) => bag.expiringSoon)
    .sort((left, right) => left.daysUntilExpiry - right.daysUntilExpiry)
    .slice(0, 4)
  const recentRequests = requests.slice(0, 4)

  const latestAddedBag = bags[0]
  const latestRejected = requests.find((request) => request.status === 'rejected')
  const latestApproved = requests.find((request) => request.status === 'approved')
  const secondBag = bags[2]

  const activities = [
    recentRequests[0]
      ? {
          title: `Permintaan ${recentRequests[0].id} dari ${recentRequests[0].hospitalName} masuk`,
          time: activityTime(recentRequests[0].requestedAtLabel),
        }
      : null,
    latestAddedBag
      ? {
          title: `Kantong ${latestAddedBag.id} (${latestAddedBag.bloodLabel}) ditambahkan`,
          time: latestAddedBag.collectedAtLabel,
        }
      : null,
    latestRejected
      ? {
          title: `Permintaan ${latestRejected.id} ditolak, stok ${latestRejected.bloodLabel} tidak cukup`,
          time: activityTime(latestRejected.requestedAtLabel),
        }
      : null,
    latestApproved
      ? {
          title: `Permintaan ${latestApproved.id} disetujui untuk ${latestApproved.hospitalName}`,
          time: activityTime(latestApproved.requestedAtLabel),
        }
      : secondBag
        ? {
            title: `Kantong ${secondBag.id} (${secondBag.bloodLabel}) ditambahkan`,
            time: secondBag.collectedAtLabel,
          }
        : null,
  ].filter((activity): activity is { title: string; time: string } => activity !== null)

  return (
    <div className="w-full px-6 py-8 pb-16 lg:px-8">
      <header>
        <h1 className="m-0 text-3xl font-bold tracking-[-0.02em] text-heading">Dashboard</h1>
        <p className="mt-1.5 mb-0 text-sm text-muted">
          Ringkasan stok darah dan permintaan rumah sakit
        </p>
      </header>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          hint="Dari 4 golongan darah"
          icon={Droplet}
          label="Total stok"
          tone="primary"
          unit="Kantong"
          value={isStockLoading ? 0 : summary.total}
        />
        <StatCard
          hint="Expired dalam 7 hari"
          icon={Clock}
          label="Hampir expired"
          tone="warning"
          unit="Kantong"
          value={isStockLoading ? 0 : summary.expiringSoon}
        />
        <StatCard
          hint="Perlu dikeluarkan dari stok"
          icon={AlertCircle}
          label="Sudah expired"
          tone="danger"
          unit="Kantong"
          value={isStockLoading ? 0 : summary.expired}
        />
        <StatCard
          hint="Butuh verifikasi"
          icon={Inbox}
          label="Permintaan Menunggu"
          tone="info"
          unit="Request"
          value={isRequestsLoading ? 0 : pendingCount}
        />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-field">
          <div className="flex items-center justify-between gap-3">
            <h2 className="m-0 text-lg font-bold text-heading">Stok per golongan</h2>
            <Link
              className="text-xs font-bold text-primary no-underline hover:text-primary-800"
              to="/utd/stok"
            >
              Lihat kantong darah
            </Link>
          </div>

          <div className="mt-5 space-y-4">
            {summary.groups.map((group) => (
              <div className="flex items-center gap-3" key={group.bloodType}>
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary-50 text-xs font-bold text-primary-800">
                  {group.bloodType}
                </span>
                <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-surface-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${Math.round((group.total / maxGroupTotal) * 100)}%` }}
                  />
                </div>
                <p className="m-0 flex w-32 shrink-0 items-baseline justify-end gap-1.5 text-sm font-bold text-foreground">
                  {group.total}
                  <span className="text-[10px] font-medium text-muted">
                    Rh+ {group.positive} · Rh− {group.negative}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5 shadow-field">
          <h2 className="m-0 text-lg font-bold text-heading">Stok kritis</h2>
          <p className="mt-1 mb-0 text-xs text-muted">
            Di bawah batas minimum {MINIMUM_STOCK_PER_GROUP} kantong
          </p>

          <div className="mt-4 space-y-2.5">
            {summary.critical.length === 0 ? (
              <p className="m-0 text-sm text-muted">Semua golongan berada di atas batas minimum.</p>
            ) : (
              summary.critical.map((item) => (
                <div
                  className="flex items-center justify-between gap-3 rounded-xl bg-danger/5 px-4 py-3"
                  key={item.label}
                >
                  <span className="text-sm font-bold text-foreground">
                    {item.bloodType} {item.rhesus === 'negative' ? 'Rhesus −' : 'Rhesus +'}
                  </span>
                  <span className="text-xs font-bold text-danger">{item.count} kantong</span>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-field">
          <div className="flex items-center justify-between gap-3 p-5 pb-2">
            <h2 className="m-0 text-lg font-bold text-heading">Permintaan RS terbaru</h2>
            <Link
              className="text-xs font-bold text-primary no-underline hover:text-primary-800"
              to="/utd/permintaan"
            >
              Lihat semua
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="text-left text-[11px] font-semibold tracking-[0.06em] text-muted uppercase">
                  <th className="border-b border-border px-5 py-3 font-semibold">ID</th>
                  <th className="border-b border-border px-5 py-3 font-semibold">Rumah Sakit</th>
                  <th className="border-b border-border px-5 py-3 font-semibold">Darah</th>
                  <th className="border-b border-border px-5 py-3 font-semibold">Jumlah</th>
                  <th className="border-b border-border px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.length === 0 ? (
                  <tr>
                    <td className="px-5 py-10 text-center text-sm text-muted" colSpan={5}>
                      Belum ada permintaan masuk.
                    </td>
                  </tr>
                ) : (
                  recentRequests.map((request) => (
                    <tr key={request.id}>
                      <td className="border-b border-border px-5 py-3.5 font-bold text-foreground">
                        {request.id}
                      </td>
                      <td className="border-b border-border px-5 py-3.5 text-foreground">
                        {request.hospitalName}
                      </td>
                      <td className="border-b border-border px-5 py-3.5 text-foreground">
                        {request.bloodLabel}
                      </td>
                      <td className="border-b border-border px-5 py-3.5 text-muted">
                        {request.quantity} kantong
                      </td>
                      <td className="border-b border-border px-5 py-3.5">
                        <StatusBadge label={request.statusLabel} tone={request.statusTone} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <div className="space-y-5">
          <section className="rounded-2xl border border-border bg-surface p-5 shadow-field">
            <div className="flex items-center justify-between gap-3">
              <h2 className="m-0 text-lg font-bold text-heading">Segera expired</h2>
              <Link
                className="text-xs font-bold text-primary no-underline hover:text-primary-800"
                to="/utd/stok"
              >
                Lihat
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {expiringBags.length === 0 ? (
                <p className="m-0 text-sm text-muted">Tidak ada kantong yang mendekati kedaluwarsa.</p>
              ) : (
                expiringBags.map((bag) => (
                  <div className="flex items-center gap-3" key={bag.id}>
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary-50 text-[11px] font-bold text-primary-800">
                      {bag.bloodLabel}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="m-0 truncate text-xs font-bold text-foreground">{bag.id}</p>
                      <p className="m-0 truncate text-[11px] text-muted">
                        Expired {bag.expiresAtLabel}
                      </p>
                    </div>
                    <span className="rounded-md bg-warning/10 px-2 py-1 text-[10px] font-bold whitespace-nowrap text-warning">
                      {expiringLabel(bag)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-5 shadow-field">
            <h2 className="m-0 text-lg font-bold text-heading">Aktivitas terbaru</h2>

            <div className="mt-4 space-y-3">
              {activities.length === 0 ? (
                <p className="m-0 text-sm text-muted">Belum ada aktivitas.</p>
              ) : (
                activities.map((activity) => (
                  <div className="border-l-2 border-primary-200 pl-3" key={activity.title}>
                    <p className="m-0 text-xs leading-relaxed font-semibold text-foreground">
                      {activity.title}
                    </p>
                    <p className="m-0 mt-0.5 text-[11px] text-muted">{activity.time}</p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
