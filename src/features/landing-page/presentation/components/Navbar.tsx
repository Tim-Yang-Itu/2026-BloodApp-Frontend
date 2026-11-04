import { useState } from 'react'
import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { href: '#lokasi-donor', label: 'Lokasi Donor' },
  { href: '#cara-donor', label: 'Cara Donor' },
  { href: '#syarat', label: 'Syarat' },
  { href: '#faq', label: 'FAQ' },
] as const

function DropMark() {
  return (
    <svg aria-hidden="true" className="size-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.4c3.2 4.1 6.6 8 6.6 11.6a6.6 6.6 0 1 1-13.2 0C5.4 10.4 8.8 6.5 12 2.4Z" />
    </svg>
  )
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="sticky top-0 z-10 border-b border-border/75 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[76px] max-w-[1180px] items-center justify-between px-6">
        <Link className="inline-flex items-center gap-2.5 text-foreground no-underline" to="/" onClick={closeMenu}>
          <span className="grid size-9 place-items-center rounded-full bg-primary text-xs font-bold tracking-wide text-on-primary">
            <DropMark />
          </span>
          <span className="text-[1.05rem] font-bold">DonorKu</span>
        </Link>

        <button
          className="block cursor-pointer border-0 bg-transparent p-1.5 sm:hidden"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="landing-navigation"
          aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span className="my-1 block h-0.5 w-5 bg-foreground" />
          <span className="my-1 block h-0.5 w-5 bg-foreground" />
          <span className="my-1 block h-0.5 w-5 bg-foreground" />
        </button>

        <nav
          id="landing-navigation"
          className={`${isMenuOpen ? 'flex' : 'hidden'} absolute top-[68px] right-4 left-4 flex-col gap-4 rounded-xl border border-border bg-surface p-5 shadow-lg sm:static sm:flex sm:flex-row sm:items-center sm:gap-8 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none`}
          aria-label="Navigasi landing page"
        >
          {NAV_LINKS.map((link) => (
            <a key={link.href} className="text-sm font-semibold text-muted no-underline hover:text-primary" href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <div className="mt-2 flex flex-col gap-2 sm:mt-0 sm:flex-row sm:gap-2">
            <Link className="inline-flex min-h-9 items-center justify-center rounded-lg border border-primary px-5 py-2 text-sm font-semibold text-primary no-underline transition-colors hover:bg-primary-50" to="/login" onClick={closeMenu}>
              Masuk
            </Link>
            <Link className="inline-flex min-h-9 items-center justify-center rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-on-primary no-underline transition-colors hover:bg-primary-hover" to="/register" onClick={closeMenu}>
              Daftar
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
