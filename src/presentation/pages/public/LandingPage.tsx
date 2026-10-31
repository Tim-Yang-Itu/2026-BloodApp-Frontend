import { Link } from 'react-router-dom'
import { StatusBadge } from '@/presentation/components/shared/StatusBadge'
import { useAuth } from '@/presentation/hooks/use-auth'
import { useDemoData } from '@/presentation/hooks/use-demo-data'
import { summarizeStockByBloodType } from '@/domain/rules/stock'
import { STOCK_LEVEL_LABELS, formatBloodType } from '@/shared/constants/labels'
import { stockLevelTone } from '@/presentation/utils/badges'
import { formatDate } from '@/shared/utils/format-date'
import { APP_NAME, APP_DESCRIPTION } from '@/shared/constants/app'
import { ROUTES, getHomeRouteForRole } from '@/shared/constants/routes'

/**
 * Landing page publik — PD-01.
 * Menampilkan status stok (EX-05) dan jadwal lokasi donor (PD-02) dari data contoh.
 */
export const LandingPage = () => {
  const { status, user } = useAuth()
  const { bloodBags, donorLocations } = useDemoData()

  const isAuthenticated = status === 'authenticated' && user !== null
  const stockSummary = summarizeStockByBloodType(bloodBags)

  return (
    <div className="landing">
      <header className="landing__nav container">
        <Link className="brand" to={ROUTES.home}>
          <span className="brand__mark" aria-hidden="true">
            +
          </span>
          <span className="brand__name">{APP_NAME}</span>
        </Link>

        <nav className="landing__links" aria-label="Navigasi utama">
          {isAuthenticated ? (
            <Link className="btn btn--primary" to={getHomeRouteForRole(user.role)}>
              Buka dashboard
            </Link>
          ) : (
            <>
              <Link className="btn btn--ghost" to={ROUTES.registerDonor}>
                Daftar pendonor
              </Link>
              <Link className="btn btn--primary" to={ROUTES.login}>
                Masuk
              </Link>
            </>
          )}
        </nav>
      </header>

      <main className="container landing__main">
        <section className="landing__hero">
          <p className="eyebrow">Donor darah terpadu</p>
          <h1 className="landing__title">
            Darah tersedia tepat waktu, untuk pasien yang membutuhkan.
          </h1>
          <p className="landing__description">{APP_DESCRIPTION}</p>

          <div className="landing__actions">
            <Link className="btn btn--primary btn--lg" to={ROUTES.registerDonor}>
              Jadi pendonor
            </Link>
            <Link className="btn btn--secondary btn--lg" to={ROUTES.login}>
              Masuk ke dashboard
            </Link>
          </div>
        </section>

        <section aria-labelledby="stok-publik">
          <header className="section-heading">
            <h2 id="stok-publik" className="section-heading__title">
              Ketersediaan darah hari ini
            </h2>
            <p className="section-heading__subtitle">
              Ringkasan stok kantong yang lolos uji di UTD/PMI mitra. Data contoh, bukan
              angka resmi.
            </p>
          </header>

          <div className="stock-grid">
            {stockSummary.map((row) => (
              <article key={`${row.bloodGroup}-${row.rhesus}`} className="stock-card">
                <p className="stock-card__type">
                  {formatBloodType(row.bloodGroup, row.rhesus)}
                </p>
                <p className="stock-card__count">{row.available}</p>
                <StatusBadge tone={stockLevelTone(row.level)}>
                  {STOCK_LEVEL_LABELS[row.level]}
                </StatusBadge>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="lokasi-donor">
          <header className="section-heading">
            <h2 id="lokasi-donor" className="section-heading__title">
              Lokasi & jadwal donor terdekat
            </h2>
            <p className="section-heading__subtitle">
              Datang sesuai jadwal, bawa identitas, dan tunjukkan tiket QR Anda.
            </p>
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
                        {schedule.startTime}–{schedule.endTime} · sisa kuota{' '}
                        {schedule.quota - schedule.registeredCount}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="landing__grid" aria-label="Ringkasan alur">
          <article className="card">
            <h2 className="card__title">Untuk pendonor & publik</h2>
            <p className="card__text">
              Cari lokasi donor, lihat jadwal layanan, dan pantau status ketersediaan darah
              tanpa perlu login.
            </p>
            <p className="card__meta">PD-01 · PD-02 · EX-05</p>
          </article>

          <article className="card">
            <h2 className="card__title">Untuk UTD/PMI</h2>
            <p className="card__text">
              Kelola stok kantong darah, pantau kedaluwarsa, dan proses permintaan dari
              rumah sakit dengan jejak audit.
            </p>
            <p className="card__meta">AU-01 – AU-06</p>
          </article>

          <article className="card">
            <h2 className="card__title">Untuk rumah sakit</h2>
            <p className="card__text">
              Cek ketersediaan real-time, ajukan permintaan darah, lalu konfirmasi
              penerimaan saat darah tiba.
            </p>
            <p className="card__meta">AR-01 – AR-06</p>
          </article>
        </section>

        <section className="card card--notice">
          <h2 className="card__title">Aplikasi mode tampilan</h2>
          <p className="card__text">
            Versi ini belum terhubung ke backend. Login tiga peran, registrasi pendonor,
            pemulihan sesi, dan proteksi rute sudah berjalan memakai data contoh.
          </p>
        </section>
      </main>

      <footer className="landing__footer container">
        <p>
          {APP_NAME} — tidak ada jual-beli darah. Setiap perubahan stok dan permintaan
          tercatat.
        </p>
      </footer>
    </div>
  )
}
