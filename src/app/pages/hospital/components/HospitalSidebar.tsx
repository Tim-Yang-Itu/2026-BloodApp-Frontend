import { LogOut, UserRound, X } from 'lucide-react'
import { Link } from 'react-router-dom'

import { HOSPITAL_NAV_ITEMS } from '../navigation'
import type { HospitalTab } from '../types'

type HospitalSidebarProps = {
  activeTab: HospitalTab
  isOpen: boolean
  /** Jumlah permintaan yang masih menunggu verifikasi UTD. */
  pendingCount: number
  adminName: string
  onNavigate: (tab: HospitalTab) => void
  onClose: () => void
  /** Menghapus sesi lalu kembali ke halaman masuk. */
  onLogout: () => void
}

function DropMark() {
  return (
    <svg aria-hidden="true" className="size-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.4c3.2 4.1 6.6 8 6.6 11.6a6.6 6.6 0 1 1-13.2 0C5.4 10.4 8.8 6.5 12 2.4Z" />
    </svg>
  )
}

/** Sidebar area Admin RS (drawer pada layar kecil, menetap pada layar besar). */
export function HospitalSidebar({
  activeTab,
  isOpen,
  pendingCount,
  adminName,
  onNavigate,
  onClose,
  onLogout,
}: HospitalSidebarProps) {
  return (
    <>
      {isOpen ? (
        <button
          aria-label="Tutup menu"
          className="fixed inset-0 z-30 cursor-default border-0 bg-heading/20 lg:hidden"
          onClick={onClose}
          type="button"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-[264px] flex-col border-r border-border bg-surface px-5 py-6 transition-transform lg:sticky lg:top-0 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-2">
          <Link className="inline-flex items-center gap-2.5 text-foreground no-underline" to="/">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-on-primary">
              <DropMark />
            </span>
            <span className="text-xl font-bold text-heading">DonorKu</span>
          </Link>
          <button
            aria-label="Tutup sidebar"
            className="rounded-lg p-2 text-muted hover:bg-surface-muted lg:hidden"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <div className="mt-10">
          <p className="px-3 text-[11px] font-bold tracking-[0.14em] text-muted uppercase">
            Menu utama
          </p>
          <nav aria-label="Navigasi dashboard rumah sakit" className="mt-3 space-y-1">
            {HOSPITAL_NAV_ITEMS.map((item) => {
              const Icon = item.icon

              return (
                <button
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-colors ${
                    item.id === activeTab
                      ? 'bg-primary-50 text-primary'
                      : 'text-label hover:bg-surface-muted'
                  }`}
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id)
                    onClose()
                  }}
                  type="button"
                >
                  <Icon aria-hidden="true" className="size-[18px]" />
                  {item.label}
                  {item.id === 'requests' && pendingCount > 0 ? (
                    <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-[10px] text-on-primary">
                      {pendingCount}
                    </span>
                  ) : null}
                </button>
              )
            })}
          </nav>
        </div>

        <div className="mt-auto space-y-1 border-t border-border pt-5">
          <button
            className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-danger hover:bg-surface-muted"
            onClick={onLogout}
            type="button"
          >
            <LogOut aria-hidden="true" className="size-[18px]" />
            Keluar
          </button>
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-surface-muted p-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary-100 text-primary">
              <UserRound aria-hidden="true" className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-heading">{adminName}</p>
              <p className="truncate text-[11px] text-muted">Admin Rumah Sakit</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
