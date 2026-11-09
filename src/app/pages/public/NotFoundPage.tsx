import { Link } from 'react-router-dom'

import { ROUTES } from '@/shared/constants/routes'

/** Halaman 404 untuk rute publik yang tidak dikenal. */
export function NotFoundPage() {
  return (
    <section className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
      <h2 className="mb-2 text-2xl font-bold">404 — Halaman tidak ditemukan</h2>
      <p className="text-muted">Rute yang Anda tuju belum tersedia.</p>
      <Link
        className="mt-2 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 font-semibold text-on-primary no-underline hover:bg-primary-hover"
        to={ROUTES.landing}
      >
        Kembali ke beranda
      </Link>
    </section>
  )
}
