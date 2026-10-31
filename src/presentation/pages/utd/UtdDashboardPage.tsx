import { DashboardLayout } from '@/presentation/layouts/DashboardLayout'
import { StatusBadge } from '@/presentation/components/shared/StatusBadge'
import { useAuth } from '@/presentation/hooks/use-auth'
import { useDemoData } from '@/presentation/hooks/use-demo-data'
import { daysUntilExpiry, isBagUsable, isNearExpiry } from '@/domain/rules/stock'
import {
  BLOOD_BAG_STATUS_LABELS,
  BLOOD_COMPONENT_LABELS,
  BLOOD_REQUEST_STATUS_LABELS,
  BLOOD_TEST_STATUS_LABELS,
  REQUEST_URGENCY_LABELS,
  formatBloodType,
} from '@/shared/constants/labels'
import { formatDate, formatDateTime } from '@/shared/utils/format-date'
import { requestStatusTone, testStatusTone, urgencyTone } from '@/presentation/utils/badges'

/**
 * Beranda Admin UTD/PMI — AU-02..AU-06, EX-01..EX-03.
 * Seluruh angka adalah data contoh (aplikasi mode tampilan).
 */
export const UtdDashboardPage = () => {
  const { user } = useAuth()
  const { bloodBags, bloodRequests, donorLocations } = useDemoData()

  const usableBags = bloodBags.filter((bag) => isBagUsable(bag))
  const nearExpiryBags = bloodBags.filter((bag) => isNearExpiry(bag))
  const pendingRequests = bloodRequests.filter((request) => request.status === 'pending')
  const blockedBags = bloodBags.filter(
    (bag) => bag.testStatus === 'reactive' || bag.status === 'blocked',
  )

  const sortedBags = [...bloodBags].sort((a, b) => {
    const usableDelta = Number(isBagUsable(b)) - Number(isBagUsable(a))
    if (usableDelta !== 0) return usableDelta
    return new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime()
  })

  return (
    <DashboardLayout
      title="Portal Admin UTD/PMI"
      description={`Fasilitas: ${user?.facilityId ?? 'belum terhubung'}. Ringkasan stok kantong darah dan permintaan rumah sakit.`}
    >
      <div className="stat-grid">
        <article className="stat">
          <p className="stat__label">Kantong layak stok</p>
          <p className="stat__value">{usableBags.length}</p>
          <p className="stat__hint">Lolos uji, tersedia, belum kedaluwarsa</p>
        </article>
        <article className="stat">
          <p className="stat__label">Mendekati kedaluwarsa</p>
          <p className="stat__value stat__value--warning">{nearExpiryBags.length}</p>
          <p className="stat__hint">Sisa umur ≤ 7 hari</p>
        </article>
        <article className="stat">
          <p className="stat__label">Permintaan menunggu</p>
          <p className="stat__value">{pendingRequests.length}</p>
          <p className="stat__hint">Perlu verifikasi UTD/PMI</p>
        </article>
        <article className="stat">
          <p className="stat__label">Kantong diblokir</p>
          <p className="stat__value stat__value--danger">{blockedBags.length}</p>
          <p className="stat__hint">Reaktif / tidak boleh dipakai</p>
        </article>
      </div>

      <section className="panel">
        <header className="panel__header">
          <h2 className="panel__title">Stok kantong darah</h2>
          <p className="panel__subtitle">
            Hanya kantong lolos uji dan belum kedaluwarsa yang dihitung sebagai stok.
          </p>
        </header>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">No. kantong</th>
                <th scope="col">Golongan</th>
                <th scope="col">Komponen</th>
                <th scope="col">Uji</th>
                <th scope="col">Status</th>
                <th scope="col">Kedaluwarsa</th>
              </tr>
            </thead>
            <tbody>
              {sortedBags.map((bag) => {
                const remaining = daysUntilExpiry(bag)

                return (
                  <tr key={bag.id}>
                    <td className="table__mono">{bag.bagNumber}</td>
                    <td>
                      <strong>{formatBloodType(bag.bloodGroup, bag.rhesus)}</strong>
                    </td>
                    <td>{BLOOD_COMPONENT_LABELS[bag.component]}</td>
                    <td>
                      <StatusBadge tone={testStatusTone(bag.testStatus)}>
                        {BLOOD_TEST_STATUS_LABELS[bag.testStatus]}
                      </StatusBadge>
                    </td>
                    <td>{BLOOD_BAG_STATUS_LABELS[bag.status]}</td>
                    <td>
                      <span className={isNearExpiry(bag) ? 'text-warning' : undefined}>
                        {formatDate(bag.expiresAt)}
                      </span>
                      <span className="table__sub">
                        {isBagUsable(bag) ? `${remaining} hari lagi` : 'tidak dihitung'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <header className="panel__header">
          <h2 className="panel__title">Permintaan masuk</h2>
          <p className="panel__subtitle">
            Verifikasi permintaan RS; penolakan wajib disertai alasan (PRD §6).
          </p>
        </header>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">No. permintaan</th>
                <th scope="col">Kebutuhan</th>
                <th scope="col">Urgensi</th>
                <th scope="col">Status</th>
                <th scope="col">Diajukan</th>
              </tr>
            </thead>
            <tbody>
              {bloodRequests.map((request) => (
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
                  <td>{formatDateTime(request.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <header className="panel__header">
          <h2 className="panel__title">Lokasi & jadwal donor</h2>
          <p className="panel__subtitle">Jadwal ini tayang di landing page publik (EX-02).</p>
        </header>

        <div className="card-grid">
          {donorLocations.map((location) => (
            <article key={location.id} className="card">
              <h3 className="card__title">{location.name}</h3>
              <p className="card__text">
                {location.address}, {location.city}
              </p>
              <ul className="schedule-list">
                {location.schedules.map((schedule) => (
                  <li key={schedule.id}>
                    <span>{formatDate(`${schedule.date}T00:00:00.000Z`)}</span>
                    <span className="muted">
                      {schedule.startTime}–{schedule.endTime} · {schedule.registeredCount}/
                      {schedule.quota} pendaftar
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </DashboardLayout>
  )
}
