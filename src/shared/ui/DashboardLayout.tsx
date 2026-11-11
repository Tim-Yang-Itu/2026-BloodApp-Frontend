import { LogOut, Menu, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

export type DashboardNavItem = {
  to: string
  label: string
  icon: LucideIcon
  /** `true` untuk item beranda agar tidak ikut aktif di semua sub-rute. */
  end?: boolean
  /** Angka kecil di sisi kanan item, mis. jumlah permintaan menunggu. */
  badge?: number
}

export type DashboardUser = {
  name: string
  /** Keterangan peran di bawah nama, mis. email atau nama instansi. */
  detail: string
  /** Inisial untuk avatar, umumnya dari `initialsOf()`. */
  initials: string
}

type DashboardLayoutProps = {
  /** Label navigasi untuk pembaca layar, mis. `Navigasi UTD`. */
  navLabel: string
  navItems: readonly DashboardNavItem[]
  user: DashboardUser
  onLogout: () => void
  /** Unik per peran supaya `aria-controls` tombol menu tepat sasaran. */
  sidebarId: string
}

function DropMark() {
  return (
    <svg aria-hidden="true" className="size-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.4c3.2 4.1 6.6 8 6.6 11.6a6.6 6.6 0 1 1-13.2 0C5.4 10.4 8.8 6.5 12 2.4Z" />
    </svg>
  )
}

function navItemClass(isActive: boolean): string {
  return [
    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold no-underline transition-colors',
    isActive
      ? 'bg-primary-50 text-primary-800'
      : 'text-label hover:bg-surface-muted hover:text-primary',
  ].join(' ')
}

/**
 * Kerangka area ber-peran (pendonor, UTD, RS).
 *
 * Sidebar, drawer layar kecil, dan footer dipasang sekali di sini agar ketiga
 * area memakai lebar, jarak, dan perilaku responsif yang sama. Isi halaman
 * datang dari `<Outlet />`; padding halaman sudah diurus `main`, jadi halaman
 * tidak perlu menambahkan `px-*`/`py-*` pada pembungkus terluarnya.
 */
export function DashboardLayout({
  navLabel,
  navItems,
  user,
  onLogout,
  sidebarId,
}: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const closeSidebar = () => setIsSidebarOpen(false)

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-2 px-5 py-5">
        <Link
          className="inline-flex items-center gap-2.5 text-foreground no-underline"
          onClick={closeSidebar}
          to="/"
        >
          <span className="grid size-9 place-items-center rounded-full bg-primary text-on-primary">
            <DropMark />
          </span>
          <span className="text-[1.05rem] font-bold">DonorKu</span>
        </Link>
        <button
          aria-label="Tutup menu"
          className="grid size-8 cursor-pointer place-items-center rounded-lg border-0 bg-transparent text-muted hover:bg-surface-muted hover:text-foreground lg:hidden"
          onClick={closeSidebar}
          type="button"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      </div>

      <nav aria-label={navLabel} className="mt-1 flex flex-col gap-1 px-3">
        {navItems.map(({ to, label, icon: Icon, end, badge }) => (
          <NavLink
            className={({ isActive }) => navItemClass(isActive)}
            end={end}
            key={to}
            onClick={closeSidebar}
            to={to}
          >
            <Icon aria-hidden="true" className="size-4 shrink-0" />
            {label}
            {badge && badge > 0 ? (
              <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-on-primary">
                {badge}
              </span>
            ) : null}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-bold text-primary-hover">
            {user.initials}
          </span>
          <div className="min-w-0">
            <p className="m-0 truncate text-sm font-bold text-heading">{user.name}</p>
            <p className="m-0 truncate text-xs text-muted">{user.detail}</p>
          </div>
        </div>
        <button
          className="mt-1 flex w-full cursor-pointer items-center gap-3 rounded-lg border-0 bg-transparent px-3 py-2.5 text-left text-sm font-semibold text-muted transition-colors hover:bg-surface-muted hover:text-primary"
          onClick={onLogout}
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
            aria-controls={sidebarId}
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
          {user.initials}
        </span>
      </header>

      {isSidebarOpen ? (
        <button
          aria-label="Tutup menu"
          className="fixed inset-0 z-30 cursor-default border-0 bg-heading/40 lg:hidden"
          onClick={closeSidebar}
          type="button"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[264px] border-r border-border bg-surface transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        id={sidebarId}
      >
        {sidebar}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <main className="w-full flex-1 px-6 py-8 pb-16 lg:px-8">
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
