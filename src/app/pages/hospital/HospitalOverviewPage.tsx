import { AlertTriangle, CircleCheck, Clock3, Droplet, PackageX } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/features/auth'
import { MINIMUM_STOCK_PER_GROUP, useBloodStock } from '@/features/blood-stock'
import { PageHeader, StatCard } from '@/shared/ui'
import { formatLongDate } from '@/shared/utils/format-date'

import { RecentRequestsCard } from './components/RecentRequestsCard'
import { StockSummaryCard } from './components/StockSummaryCard'
import { hospitalPathOf } from './navigation'
import { useHospitalRequests } from './use-hospital-requests'
import { toStockGroups } from './view-model'

/** RS-02/RS-04: ringkasan stok darah dan permintaan rumah sakit. */
export function HospitalOverviewPage() {
  const { user } = useAuth()
  const { summary, today } = useBloodStock()
  const { requests } = useHospitalRequests()
  const navigate = useNavigate()

  const adminName = user?.profile.fullName ?? 'Admin RS'
  const groups = toStockGroups(summary.groups)
  const pendingRequests = requests.filter((request) => request.status === 'pending')
  const approvedRequests = requests.filter((request) => request.status === 'approved')
  const recentRequests = requests.slice(0, 3)

  return (
    <>
      <div className="mb-8">
        <PageHeader
          actions={
            <button
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-on-primary shadow-field hover:bg-primary-hover"
              onClick={() => navigate(hospitalPathOf('requests'))}
              type="button"
            >
              <Droplet aria-hidden="true" className="size-4" />
              Lihat permintaan
            </button>
          }
          description="Pantau ketersediaan darah dan permintaan rumah sakit hari ini."
          eyebrow={formatLongDate(today)}
          title={`Selamat datang, ${adminName}`}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Droplet}
          label="Total stok darah"
          note={`Dari ${groups.length} golongan darah`}
          tone="primary"
          value={`${summary.total} kantong`}
        />
        <StatCard
          icon={Clock3}
          label="Menunggu verifikasi"
          note="Belum diputuskan UTD"
          tone="warning"
          value={`${pendingRequests.length} permintaan`}
        />
        <StatCard
          icon={CircleCheck}
          label="Disetujui UTD"
          note="Siap diambil di UTD"
          tone="success"
          value={`${approvedRequests.length} permintaan`}
        />
        <StatCard
          icon={PackageX}
          label="Hampir expired"
          note="Kantong berumur ≤ 7 hari"
          tone="danger"
          value={`${summary.expiringSoon} kantong`}
        />
      </div>

      <section className="mt-6 flex items-start gap-3 rounded-2xl border border-primary-200 bg-primary-50 p-5">
        <AlertTriangle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
        <div className="min-w-0">
          <p className="text-sm font-bold text-primary-800">Perhatian stok</p>
          <p className="mt-1 text-xs leading-relaxed text-primary-800/80">
            {summary.critical.length === 0
              ? `Semua golongan darah berada di atas batas minimum ${MINIMUM_STOCK_PER_GROUP} kantong.`
              : `Stok ${summary.critical.map((item) => item.label).join(', ')} berada di bawah batas minimum ${MINIMUM_STOCK_PER_GROUP} kantong. Pertimbangkan mengajukan permintaan tambahan ke UTD terdekat.`}
          </p>
        </div>
        <button
          className="ml-auto shrink-0 cursor-pointer text-xs font-bold text-primary hover:underline"
          onClick={() => navigate(hospitalPathOf('stock'))}
          type="button"
        >
          Cek stok
        </button>
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <StockSummaryCard
          groups={groups}
          onViewAll={() => navigate(hospitalPathOf('stock'))}
        />
        <RecentRequestsCard
          onViewAll={() => navigate(hospitalPathOf('requests'))}
          requests={recentRequests}
        />
      </div>
    </>
  )
}
