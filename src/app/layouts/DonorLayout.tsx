import { LayoutDashboard, LogOut, MapPin, Menu, Ticket, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

import { initialsOf, useAuth } from '@/features/auth'

function DropMark() {
  return (
    <svg aria-hidden="true" className="size-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.4c3.2 4.1 6.6 8 6.6 11.6a6.6 6.6 0 1 1-13.2 0C5.4 10.4 8.8 6.5 12 2.4Z" />
    </svg>
  )
}

const NAV_LINKS = [
  { to: '/dashboard-pendonor', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/jadwal-donor', label: 'Lokasi Donor', icon: MapPin },
  { to: '/tiket-saya', label: 'Tiket Saya', icon: Ticket },
] as const

function navItemClass(isActive: boolean): string {
  return [
    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold no-underline transition-colors',
    isActive
      ? 'bg-primary-50 text-primary-800'
      : 'text-label hover:bg-surface-muted hover:text-primary',
  ].join(' ')
}

/**
 * Layout area pendonor: sidebar kiri berisi navigasi, identitas akun, dan tombol keluar.
 * Pada layar kecil sidebar berubah menjadi drawer yang dibuka lewat tombol menu.
 */
export function DonorLayout() {
  const { user, logout } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()

  // Drawer ditutup setiap kali rute berubah agar tidak menutupi halaman baru.
  useEffect(() => {
    setIsSidebarOpen(false)
  }, [location.pathname])

  const initials = user ? initialsOf(user.profile.fullName) : 'PD'

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-2 px-5 py-5">
        <Link className="inline-flex items-center gap-2.5 text-foreground no-underline" to="/">
          <span className="grid size-9 place-items-center rounded-full bg-primary text-on-primary">
            <DropMark />
          </span>
          <span className="text-[1.05rem] font-bold">DonorKu</span>
        </Link>
        <button
          aria-label="Tutup menu"
          className="grid size-8 cursor-pointer place-items-center rounded-lg border-0 bg-transparent text-muted hover:bg-surface-muted hover:text-foreground lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          type="button"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      </div>

      <nav aria-label="Navigasi pendonor" className="mt-1 flex flex-col gap-1 px-3">
        {NAV_LINKS.map(({ to, label, icon: Icon }) => (
          <NavLink
            className={({ isActive }) => navItemClass(isActive)}
            key={to}
            to={to}
          >
            <Icon aria-hidden="true" className="size-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-bold text-primary-hover">
            {initials}
          </span>
          <div className="min-w-0">
            <p className="m-0 truncate text-sm font-bold text-heading">
              {user?.profile.fullName ?? 'Pendonor'}
            </p>
            <p className="m-0 truncate text-xs text-muted">{user?.email ?? '-'}</p>
          </div>
        </div>
        <button
          className="mt-1 flex w-full cursor-pointer items-center gap-3 rounded-lg border-0 bg-transparent px-3 py-2.5 text-left text-sm font-semibold text-muted transition-colors hover:bg-surface-muted hover:text-primary"
          onClick={logout}
          type="button"
        >
          <LogOut aria-hidden="true" className="size-4 shrink-0" />
          Keluar
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-surface-sunken lg:flex">
      {/* Bar tipis khusus layar kecil: tombol buka sidebar + identitas singkat. */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-2">
          <button
            aria-controls="donor-sidebar"
            aria-expanded={isSidebarOpen}
            aria-label="Buka menu"
            className="grid size-9 cursor-pointer place-items-center rounded-lg border border-border bg-surface text-foreground"
            onClick={() => setIsSidebarOpen(true)}
            type="button"
          >
            <Menu aria-hidden="true" className="size-4" />
          </button>
          <Link className="inline-flex items-center gap-2 text-foreground no-underline" to="/">
            <span className="grid size-7 place-items-center rounded-full bg-primary text-on-primary">
              <DropMark />
            </span>
            <span className="text-sm font-bold">DonorKu</span>
          </Link>
        </div>
        <span className="grid size-8 place-items-center rounded-full bg-primary-soft text-[11px] font-bold text-primary-hover">
          {initials}
        </span>
      </header>

      {isSidebarOpen ? (
        <button
          aria-label="Tutup menu"
          className="fixed inset-0 z-30 cursor-default border-0 bg-heading/40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          type="button"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[264px] border-r border-border bg-surface transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        id="donor-sidebar"
      >
        {sidebar}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1">
          <Outlet />
        </main>

        <footer className="flex flex-wrap justify-between gap-2 border-t border-border bg-surface px-4 py-4 text-sm sm:px-8">
          <span>DonorKu &copy; 2026</span>
          <span className="text-muted">Membangun akses darah yang lebih baik untuk semua.</span>
        </footer>
      </div>
    </div>
  )
}
