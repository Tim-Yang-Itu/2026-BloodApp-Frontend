import { DashboardLayout } from '@/presentation/layouts/DashboardLayout'
import { StatusBadge } from '@/presentation/components/shared/StatusBadge'
import { useAuth } from '@/presentation/hooks/use-auth'
import { useDemoData } from '@/presentation/hooks/use-demo-data'
import {
  BLOOD_COMPONENT_LABELS,
  DONOR_REGISTRATION_STATUS_LABELS,
  formatBloodType,
} from '@/shared/constants/labels'
import { formatDate, formatDateTime, isPastDate } from '@/shared/utils/format-date'

/**
 * Beranda pendonor — PD-04, PD-05, EX-04.
 * Seluruh data adalah contoh (aplikasi mode tampilan).
 */
export const DonorDashboardPage = () => {
  const { user } = useAuth()
  const {
    donorProfile,
    donationHistory,
    activeRegistration,
    donorLocations,
  } = useDemoData()

  const location = donorLocations.find((item) => item.id === activeRegistration.locationId)
  const schedule = location?.schedules.find((item) => item.id === activeRegistration.scheduleId)

  const nextEligibleAt = donorProfile.nextEligibleAt
  const isEligibleNow = nextEligibleAt ? isPastDate(nextEligibleAt) : false

  return (
    <DashboardLayout
      title={`Selamat datang, ${user?.fullName ?? 'Pendonor'}`}
      description="Kelola pendaftaran donor, tiket QR, dan riwayat donasi Anda di sini."
    >
      <div className="stat-grid">
        <article className="stat">
          <p className="stat__label">Total donasi</p>
          <p className="stat__value">{donationHistory.length}</p>
          <p className="stat__hint">Sejak akun dibuat</p>
        </article>
        <article className="stat">
          <p className="stat__label">Donasi terakhir</p>
          <p className="stat__value stat__value--sm">
            {donorProfile.lastDonationAt ? formatDate(donorProfile.lastDonationAt) : '—'}
          </p>
          <p className="stat__hint">Donasi rutin dianjurkan tiap 3 bulan</p>
        </article>
        <article className="stat">
          <p className="stat__label">Boleh donor lagi</p>
          <p className="stat__value stat__value--sm">
            {isEligibleNow ? 'Sekarang' : nextEligibleAt ? formatDate(nextEligibleAt) : '—'}
          </p>
          <p className="stat__hint">Interval aman antar-donasi (EX-04)</p>
        </article>
        <article className="stat">
          <p className="stat__label">Golongan darah</p>
          <p className="stat__value">
            {formatBloodType(donorProfile.bloodGroup, donorProfile.rhesus)}
          </p>
          <p className="stat__hint">Data pribadi Anda</p>
        </article>
      </div>

      <section className="panel">
        <header className="panel__header">
          <h2 className="panel__title">Tiket donor aktif</h2>
          <p className="panel__subtitle">
            Tunjukkan QR Code ini ke petugas saat tiba di lokasi donor (PD-05, EX-03).
          </p>
        </header>

        <div className="ticket">
          <div className="ticket__qr" aria-label={`Kode tiket ${activeRegistration.ticketCode}`}>
            <span className="ticket__qr-grid" aria-hidden="true" />
            <span className="ticket__code">{activeRegistration.ticketCode}</span>
          </div>

          <div className="ticket__body">
            <p className="ticket__status">
              <StatusBadge tone="info">
                {DONOR_REGISTRATION_STATUS_LABELS[activeRegistration.status]}
              </StatusBadge>
            </p>
            <dl className="detail-list">
              <div>
                <dt>Lokasi</dt>
                <dd>{location?.name ?? 'Belum dipilih'}</dd>
              </div>
              <div>
                <dt>Alamat</dt>
                <dd>{location ? `${location.address}, ${location.city}` : '—'}</dd>
              </div>
              <div>
                <dt>Jadwal</dt>
                <dd>
                  {schedule
                    ? `${formatDate(`${schedule.date}T00:00:00.000Z`)} · ${schedule.startTime}–${schedule.endTime}`
                    : '—'}
                </dd>
              </div>
              <div>
                <dt>Hasil screening</dt>
                <dd>
                  {activeRegistration.screening.result === 'eligible'
                    ? 'Layak donor'
                    : 'Belum layak'}
                </dd>
              </div>
            </dl>
            <p className="card__hint">Diterbitkan {formatDateTime(activeRegistration.createdAt)}</p>
          </div>
        </div>
      </section>

      <section className="panel">
        <header className="panel__header">
          <h2 className="panel__title">Riwayat donasi</h2>
          <p className="panel__subtitle">Catatan donasi Anda di fasilitas UTD/PMI.</p>
        </header>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Tanggal</th>
                <th scope="col">Komponen</th>
                <th scope="col">Catatan</th>
              </tr>
            </thead>
            <tbody>
              {donationHistory.map((record) => (
                <tr key={record.id}>
                  <td>{formatDate(record.donatedAt)}</td>
                  <td>{BLOOD_COMPONENT_LABELS[record.component]}</td>
                  <td className="table__sub">{record.notes ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <article className="card">
        <h2 className="card__title">Data akun</h2>
        <dl className="detail-list">
          <div>
            <dt>Nama</dt>
            <dd>{user?.fullName}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{user?.email}</dd>
          </div>
          <div>
            <dt>Nomor WhatsApp</dt>
            <dd>{donorProfile.phone}</dd>
          </div>
          <div>
            <dt>Domisili</dt>
            <dd>{donorProfile.address ?? '—'}</dd>
          </div>
        </dl>
        <p className="card__hint">
          NIK disimpan terenkripsi di server dan tidak pernah ditampilkan di antarmuka.
        </p>
      </article>
    </DashboardLayout>
  )
}
