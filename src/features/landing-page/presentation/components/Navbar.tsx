import { useState } from 'react'
import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { href: '#lokasi-donor', label: 'Lokasi Donor' },
  { href: '#cara-donor', label: 'Cara Donor' },
  { href: '#syarat', label: 'Syarat' },
  { href: '#faq', label: 'FAQ' },
] as const

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="sticky top-0 z-10 border-b border-[#e3dedb]/75 bg-[#fffaf7]/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[76px] max-w-[1180px] items-center justify-between px-6">
        <Link className="inline-flex items-center gap-2.5 text-[#1f1b1a] no-underline" to="/" onClick={closeMenu}>
          <span className="grid size-9 place-items-center rounded-full bg-[#b3261e] text-xs font-bold tracking-wide text-white">
            DT
          </span>
          <span className="text-[1.05rem] font-bold">DarahTerpadu</span>
        </Link>

        <button
          className="block cursor-pointer border-0 bg-transparent p-1.5 sm:hidden"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="landing-navigation"
          aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span className="my-1 block h-0.5 w-5 bg-[#1f1b1a]" />
          <span className="my-1 block h-0.5 w-5 bg-[#1f1b1a]" />
          <span className="my-1 block h-0.5 w-5 bg-[#1f1b1a]" />
        </button>

        <nav
          id="landing-navigation"
          className={`${isMenuOpen ? 'flex' : 'hidden'} absolute top-[68px] right-4 left-4 flex-col gap-4 rounded-xl border border-[#e3dedb] bg-white p-5 shadow-lg sm:static sm:flex sm:flex-row sm:items-center sm:gap-8 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none`}
          aria-label="Navigasi landing page"
        >
          {NAV_LINKS.map((link) => (
            <a key={link.href} className="text-sm font-semibold text-[#6b6461] no-underline hover:text-[#b3261e]" href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <Link className="inline-flex min-h-9 items-center justify-center rounded-lg bg-[#b3261e] px-5 py-2 text-sm font-semibold text-white no-underline hover:bg-[#8c1d17]" to="/login" onClick={closeMenu}>
            Masuk
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
