import { useState } from 'react'
import { Link } from 'react-router-dom'

/** Menu yang bisa disorot aktif pada header publik. */
export type PublicNavKey = 'lokasi' | 'cara-donor' | 'syarat' | 'faq'

type NavLink = {
  key: PublicNavKey
  label: string
  /** Rute halaman (`/lokasi-donor`) atau anchor section landing page (`/#cara-donor`). */
  href: string
}

const NAV_LINKS: readonly NavLink[] = [
  { key: 'lokasi', label: 'Lokasi Donor', href: '/#lokasi-donor' },
  { key: 'cara-donor', label: 'Cara Donor', href: '/#cara-donor' },
  { key: 'syarat', label: 'Syarat', href: '/#syarat' },
  { key: 'faq', label: 'FAQ', href: '/#faq' },
]

function DropMark() {
  return (
    <svg aria-hidden="true" className="size-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.4c3.2 4.1 6.6 8 6.6 11.6a6.6 6.6 0 1 1-13.2 0C5.4 10.4 8.8 6.5 12 2.4Z" />
    </svg>
  )
}

type PublicNavbarProps = {
  /** Menu yang sedang dibuka, ditampilkan dengan warna primary. */
  activeNav?: PublicNavKey
}

/**
 * Header publik (landing page, daftar lokasi, detail lokasi).
 * Dipakai lintas fitur sehingga diletakkan di `shared/ui`, bukan di dalam satu fitur.
 */
export function PublicNavbar({ activeNav }: PublicNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = () => setIsMenuOpen(false)

  const itemClass = (isActive: boolean) =>
    `whitespace-nowrap text-sm font-semibold no-underline transition-colors ${
      isActive ? 'text-primary' : 'text-muted hover:text-primary'
    }`

  return (
    <header className="sticky top-0 z-20 border-b border-border/75 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[76px] max-w-[1180px] items-center justify-between px-6">
        <Link
          className="inline-flex items-center gap-2.5 text-foreground no-underline"
          onClick={closeMenu}
          to="/"
        >
          <span className="grid size-9 place-items-center rounded-full bg-primary text-xs font-bold tracking-wide text-on-primary">
            <DropMark />
          </span>
          <span className="text-[1.05rem] font-bold">DonorKu</span>
        </Link>

        <button
          aria-controls="public-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'}
          className="block cursor-pointer border-0 bg-transparent p-1.5 sm:hidden"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          type="button"
        >
          <span className="my-1 block h-0.5 w-5 bg-foreground" />
          <span className="my-1 block h-0.5 w-5 bg-foreground" />
          <span className="my-1 block h-0.5 w-5 bg-foreground" />
        </button>

        <nav
          aria-label="Navigasi publik"
          className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } absolute top-[68px] right-4 left-4 flex-col gap-4 rounded-xl border border-border bg-surface p-5 shadow-lg sm:static sm:flex sm:flex-row sm:items-center sm:gap-6 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none lg:gap-8`}
          id="public-navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              className={itemClass(activeNav === link.key)}
              key={link.key}
              onClick={closeMenu}
              to={link.href}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-2 sm:mt-0 sm:flex-row sm:gap-2">
            <Link
              className="inline-flex min-h-9 items-center justify-center whitespace-nowrap rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary no-underline transition-colors hover:bg-primary-50 lg:px-5"
              onClick={closeMenu}
              to="/login"
            >
              Masuk
            </Link>
            <Link
              className="inline-flex min-h-9 items-center justify-center whitespace-nowrap rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary no-underline transition-colors hover:bg-primary-hover lg:px-5"
              onClick={closeMenu}
              to="/register"
            >
              Daftar
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default PublicNavbar
