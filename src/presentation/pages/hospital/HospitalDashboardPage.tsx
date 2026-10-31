import { DashboardLayout } from '@/presentation/layouts/DashboardLayout'
import { StatusBadge } from '@/presentation/components/shared/StatusBadge'
import { useAuth } from '@/presentation/hooks/use-auth'
import { useDemoData } from '@/presentation/hooks/use-demo-data'
import { summarizeStockByBloodType } from '@/domain/rules/stock'
import {
  BLOOD_COMPONENT_LABELS,
  BLOOD_REQUEST_STATUS_LABELS,
  REQUEST_URGENCY_LABELS,
  STOCK_LEVEL_LABELS,
  formatBloodType,
} from '@/shared/constants/labels'
import { formatDateTime } from '@/shared/utils/format-date'
import { requestStatusTone, stockLevelTone, urgencyTone } from '@/presentation/utils/badges'

/**
 * Beranda Admin RS — AR-02..AR-06.
 * Data stok dan permintaan adalah contoh (aplikasi mode tampilan).
 */
export const HospitalDashboardPage = () => {
  const { user } = useAuth()
  const { bloodBags, bloodRequests } = useDemoData()

  const stockSummary = summarizeStockByBloodType(bloodBags)
  const facilityRequests = bloodRequests.filter(
    (request) => request.hospitalId === user?.facilityId,
  )

  return (
    <DashboardLayout
      title="Portal Admin RS"
      description={`Fasilitas: ${user?.facilityId ?? 'belum terhubung'}. Cek ketersediaan darah lalu ajukan permintaan ke UTD/PMI.`}
    >
      <section className="panel">
        <header className="panel__header">
          <h2 className="panel__title">Ketersediaan darah</h2>
          <p className="panel__subtitle">
            Stok per golongan darah dan rhesus, diperbarui dari kantong yang lolos uji.
          </p>
        </header>

        <div className="stock-grid">
          {stockSummary.map((row) => (
            <article key={`${row.bloodGroup}-${row.rhesus}`} className="stock-card">
              <p className="stock-card__type">{formatBloodType(row.bloodGroup, row.rhesus)}</p>
              <p className="stock-card__count">{row.available}</p>
              <StatusBadge tone={stockLevelTone(row.level)}>
                {STOCK_LEVEL_LABELS[row.level]}
              </StatusBadge>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <header className="panel__header">
          <h2 className="panel__title">Permintaan darah fasilitas Anda</h2>
          <p className="panel__subtitle">
            Pantau status menunggu → disetujui/ditolak → diterima (AR-04, AR-05).
          </p>
        </header>

        {facilityRequests.length === 0 ? (
          <p className="empty-state">Belum ada permintaan untuk fasilitas ini.</p>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">No. permintaan</th>
                  <th scope="col">Kebutuhan</th>
                  <th scope="col">Urgensi</th>
                  <th scope="col">Status</th>
                  <th scope="col">Diperbarui</th>
                </tr>
              </thead>
              <tbody>
                {facilityRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="table__mono">{request.requestNumber}</td>
                    <td>
                      {request.items
                        .map(
                          (item) =>
                            `${item.quantity} ${formatBloodType(item.bloodGroup, item.rhesus)} ${BLOOD_COMPONENT_LABELS[item.component]}`,
                        )
                        .join(' · ')}
                    </td>
                    <td>
                      <StatusBadge tone={urgencyTone(request.urgency)}>
                        {REQUEST_URGENCY_LABELS[request.urgency]}
                      </StatusBadge>
                    </td>
                    <td>
                      <StatusBadge tone={requestStatusTone(request.status)}>
                        {BLOOD_REQUEST_STATUS_LABELS[request.status]}
                      </StatusBadge>
                      {request.rejectionReason ? (
                        <span className="table__sub">{request.rejectionReason}</span>
                      ) : null}
                    </td>
                    <td>{formatDateTime(request.updatedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <article className="card card--notice">
        <h2 className="card__title">Distribusi tertutup</h2>
        <p className="card__text">
          Permintaan hanya diajukan Admin RS melalui sistem. Keluarga pasien tidak terlibat,
          dan tidak ada transaksi jual-beli darah.
        </p>
      </article>
    </DashboardLayout>
  )
}
