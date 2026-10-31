import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom'

/**
 * Composition root UI.
 * Saat ini hanya kerangka: rute, layout, dan halaman placeholder.
 * Halaman nyata diletakkan per fitur di
 * `src/features/<fitur>/presentation/pages/*` dan dipetakan di `src/app/router/*`.
 */

const NAV_ITEMS = [
  { to: '/', label: 'Beranda', end: true },
  { to: '/status', label: 'Status Arsitektur', end: false },
] as const

const FEATURE_LAYERS = [
  {
    name: 'domain',
    desc: 'Entitas, enum, error, kontrak repository, aturan bisnis murni. Tanpa React.',
  },
  {
    name: 'application',
    desc: 'Use case, port, dan DTO sebagai orkestrasi bisnis. Tanpa React.',
  },
  {
    name: 'infrastructure',
    desc: 'Implementasi repository/service/storage milik fitur + fixture demo.',
  },
  {
    name: 'presentation',
    desc: 'Halaman, komponen, hook, dan context khusus fitur.',
  },
] as const

const FEATURES = [
  { name: 'auth', desc: 'Login, registrasi pendonor, sesi, guard per peran.' },
  { name: 'blood-stock', desc: 'Kantong darah, stok, kedaluwarsa, status uji.' },
  { name: 'blood-request', desc: 'Permintaan darah RS dan alur verifikasi UTD.' },
  { name: 'donor', desc: 'Screening, tiket QR, riwayat dan interval donor.' },
  { name: 'donor-location', desc: 'Lokasi dan jadwal layanan donor.' },
  { name: 'notification', desc: 'Notifikasi in-app untuk perubahan status.' },
] as const

const SHARED = [
  { name: 'domain', desc: 'Shared kernel: value object lintas fitur (BloodType, UserRole).' },
  { name: 'types', desc: 'Tipe primitif: EntityId, IsoDateTime, Result.' },
  { name: 'constants', desc: 'Konstanta aplikasi, daftar rute, label.' },
  { name: 'utils', desc: 'Util murni: format tanggal, dsb.' },
  { name: 'ui', desc: 'Design system: Button, TextField, Select, Badge.' },
  { name: 'styles', desc: 'global.css (design token & utilitas kelas).' },
] as const

function HomePage() {
  return (
    <section className="panel panel--hero">
      <p className="eyebrow">Platform Donor Darah Terpadu</p>
      <h1>DarahTerpadu</h1>
      <p className="lead">
        Menghubungkan UTD/PMI, rumah sakit, dan pendonor dalam satu alur: stok darah,
        permintaan, jadwal donor, dan tiket QR.
      </p>
      <p className="muted">
        Status: <strong>kerangka arsitektur</strong> — antarmuka fitur belum diimplementasikan.
      </p>
      <Link className="button" to="/status">
        Lihat status arsitektur
      </Link>
    </section>
  )
}

function ArchitectureStatusPage() {
  return (
    <section className="panel">
      <h2>Feature-based Clean Architecture</h2>
      <p className="muted">
        Kode dipecah per <strong>fitur</strong>, dan setiap fitur memiliki empat lapisan clean
        architecture. Aturan dependensi di dalam fitur:{' '}
        <code>presentation → application → domain</code>. Lapisan <code>infrastructure</code>{' '}
        mengimplementasikan kontrak milik <code>domain</code> dan <code>application</code>.
      </p>

      <h3>Lapisan per fitur</h3>
      <ul className="layer-list">
        {FEATURE_LAYERS.map((layer) => (
          <li className="layer-item" key={layer.name}>
            <code>features/&lt;fitur&gt;/{layer.name}</code>
            <span>{layer.desc}</span>
          </li>
        ))}
      </ul>

      <h3>Feature slice</h3>
      <ul className="layer-list">
        {FEATURES.map((feature) => (
          <li className="layer-item" key={feature.name}>
            <code>features/{feature.name}</code>
            <span>{feature.desc}</span>
          </li>
        ))}
      </ul>

      <h3>Shared kernel</h3>
      <ul className="layer-list">
        {SHARED.map((item) => (
          <li className="layer-item" key={item.name}>
            <code>shared/{item.name}</code>
            <span>{item.desc}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function NotFoundPage() {
  return (
    <section className="panel">
      <h2>404 — Halaman tidak ditemukan</h2>
      <p className="muted">Rute yang Anda tuju belum tersedia.</p>
      <Link className="button" to="/">
        Kembali ke beranda
      </Link>
    </section>
  )
}

function AppShell() {
  return (
    <div className="app">
      <header className="app-header">
        <Link className="brand" to="/">
          <span className="brand__mark" aria-hidden="true">
            DT
          </span>
          <span className="brand__name">DarahTerpadu</span>
        </Link>
        <nav className="app-nav" aria-label="Navigasi utama">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? 'app-nav__link is-active' : 'app-nav__link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/status" element={<ArchitectureStatusPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <span>DarahTerpadu &copy; 2026</span>
        <span className="muted">Demo tanpa backend — data akan berasal dari fixture.</span>
      </footer>
    </div>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default App
