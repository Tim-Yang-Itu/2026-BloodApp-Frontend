import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import {
  DonorLocationDetailPage,
  DonorLocationProvider,
  DonorLocationsPage,
} from '@/features/donor-location'
import { LoginPage, RegisterPage } from '@/features/auth'
import { LandingPage } from '@/features/landing-page/presentation/pages/LandingPage'

import { container } from './container'

/**
 * Composition root UI.
 * Saat ini hanya kerangka: rute, layout, dan halaman placeholder.
 * Halaman nyata diletakkan per fitur di
 * `src/features/<fitur>/presentation/pages/*` dan dipetakan di `src/app/router/*`.
 */

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
  {
    name: 'auth',
    prd: 'UTD-01 · RS-01 · PDN-04',
    desc: 'Login dashboard UTD/RS, registrasi & login pendonor, sesi, guard per peran.',
  },
  {
    name: 'blood-stock',
    prd: 'UTD-02 · UTD-03 · UTD-04 · RS-02',
    desc: 'Input kantong, penyimpanan, monitoring stok per golongan/rhesus, ketersediaan real time.',
  },
  {
    name: 'blood-request',
    prd: 'UTD-06..09 · RS-03 · RS-04 · RS-06',
    desc: 'Pengajuan request RS, verifikasi UTD, setujui/tolak, pelacakan status, konfirmasi terima.',
  },
  {
    name: 'donor-location',
    prd: 'PDN-02 · PDN-03 · EXT-03',
    desc: 'Eksplorasi lokasi donor, detail kegiatan, filter jarak/tanggal, kelola lokasi oleh UTD.',
  },
  {
    name: 'donor-registration',
    prd: 'PDN-05 · PDN-06',
    desc: 'Form donor & screening kesehatan, tiket digital QR, scan tiket oleh petugas UTD.',
  },
  {
    name: 'donor-history',
    prd: 'EXT-02',
    desc: 'Riwayat donasi pendonor dan status kelayakan donor berikutnya.',
  },
  {
    name: 'notification',
    prd: 'UTD-05 · RS-05 · EXT-01 · EXT-04',
    desc: 'Peringatan expired, notifikasi request ditolak/disetujui, pengingat jadwal donor.',
  },
] as const

const SHARED = [
  { name: 'domain', desc: 'Shared kernel: value object lintas fitur (BloodType, UserRole).' },
  { name: 'types', desc: 'Tipe primitif: EntityId, IsoDateTime, Result.' },
  { name: 'constants', desc: 'Konstanta aplikasi, daftar rute, label.' },
  { name: 'utils', desc: 'Util murni: format tanggal, dsb.' },
  { name: 'ui', desc: 'Design system: Button, TextField, Select, Badge.' },
  {
    name: 'styles',
    desc: 'global.css — @config tailwind.config.js, base layer (font Fustat/Fraunces) + utilitas dekoratif.',
  },
] as const

function ArchitectureStatusPage() {
  return (
    <section className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
      <h2 className="mb-2 text-2xl font-bold">Feature-based Clean Architecture</h2>
      <p className="text-muted">
        Kode dipecah per <strong>fitur</strong>, dan setiap fitur memiliki empat lapisan clean
        architecture. Aturan dependensi di dalam fitur:{' '}
        <code>presentation → application → domain</code>. Lapisan <code>infrastructure</code>{' '}
        mengimplementasikan kontrak milik <code>domain</code> dan <code>application</code>.
      </p>

      <h3 className="mt-6 text-lg font-bold">Lapisan per fitur</h3>
      <ul className="mt-4 grid list-none gap-2 p-0">
        {FEATURE_LAYERS.map((layer) => (
          <li className="flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-xl border border-border bg-surface-muted p-3 text-sm" key={layer.name}>
            <code className="rounded-lg bg-surface-highlight px-1.5 py-0.5 font-mono text-xs">features/&lt;fitur&gt;/{layer.name}</code>
            <span className="flex-1 text-muted">{layer.desc}</span>
          </li>
        ))}
      </ul>

      <h3 className="mt-6 text-lg font-bold">Feature slice (sesuai modul PRD)</h3>
      <ul className="mt-4 grid list-none gap-2 p-0">
        {FEATURES.map((feature) => (
          <li className="flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-xl border border-border bg-surface-muted p-3 text-sm" key={feature.name}>
            <code className="rounded-lg bg-surface-highlight px-1.5 py-0.5 font-mono text-xs">features/{feature.name}</code>
            <span className="flex-1 text-muted">{feature.desc}</span>
            <span className="rounded-full bg-primary-soft px-2 py-0.5 text-xs font-bold text-primary-hover">{feature.prd}</span>
          </li>
        ))}
      </ul>

      <h3 className="mt-6 text-lg font-bold">Shared kernel</h3>
      <ul className="mt-4 grid list-none gap-2 p-0">
        {SHARED.map((item) => (
          <li className="flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-xl border border-border bg-surface-muted p-3 text-sm" key={item.name}>
            <code className="rounded-lg bg-surface-highlight px-1.5 py-0.5 font-mono text-xs">shared/{item.name}</code>
            <span className="flex-1 text-muted">{item.desc}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function NotFoundPage() {
  return (
    <section className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
      <h2 className="mb-2 text-2xl font-bold">404 — Halaman tidak ditemukan</h2>
      <p className="text-muted">Rute yang Anda tuju belum tersedia.</p>
      <Link className="mt-2 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 font-semibold text-on-primary no-underline hover:bg-primary-hover" to="/">
        Kembali ke beranda
      </Link>
    </section>
  )
}

function AppShell() {
  return (
    <Routes>
      {/* Halaman autentikasi memakai layar penuh, tanpa footer publik. */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<PublicShell />} />
    </Routes>
  )
}

function PublicShell() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-sunken">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* PDN-02: eksplorasi lokasi donor, terbuka tanpa login */}
        <Route
          path="/lokasi-donor"
          element={
            <DonorLocationProvider useCases={container.donorLocation}>
              <DonorLocationsPage />
            </DonorLocationProvider>
          }
        />
        {/* PDN-03: detail lokasi + pemilihan jadwal */}
        <Route
          path="/lokasi-donor/:locationId"
          element={
            <DonorLocationProvider useCases={container.donorLocation}>
              <DonorLocationDetailPage />
            </DonorLocationProvider>
          }
        />
        <Route
          path="/status"
          element={
            <main className="mx-auto w-full max-w-[960px] flex-1 px-4 py-12 sm:px-8">
              <ArchitectureStatusPage />
            </main>
          }
        />
        <Route
          path="*"
          element={
            <main className="mx-auto w-full max-w-[960px] flex-1 px-4 py-12 sm:px-8">
              <NotFoundPage />
            </main>
          }
        />
      </Routes>
      <footer className="flex flex-wrap justify-between gap-2 border-t border-border bg-surface px-4 py-4 text-sm sm:px-8">
        <span>DonorKu &copy; 2026</span>
        <span className="text-muted">Membangun akses darah yang lebih baik untuk semua.</span>
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
