import { Outlet } from 'react-router-dom'

/**
 * Kerangka halaman publik (PDN-01, PDN-02, PDN-03).
 *
 * Header publik disediakan tiap halaman lewat `PublicNavbar`; layout ini hanya
 * menambahkan latar dan footer agar tidak perlu diduplikasi di setiap rute.
 */
export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-sunken">
      <Outlet />
      <footer className="flex flex-wrap justify-between gap-2 border-t border-border bg-surface px-4 py-4 text-sm sm:px-8">
        <span>DonorKu &copy; 2026</span>
        <span className="text-muted">Membangun akses darah yang lebih baik untuk semua.</span>
      </footer>
    </div>
  )
}
