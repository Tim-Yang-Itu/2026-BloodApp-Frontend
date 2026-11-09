import { Bell, Menu, UserRound } from 'lucide-react'

type HospitalHeaderProps = {
  adminName: string
  /** Nama tab yang sedang aktif, dipakai sebagai judul bilah atas. */
  title: string
  onOpenMenu: () => void
}

/** Bilah atas area Admin RS. */
export function HospitalHeader({ adminName, title, onOpenMenu }: HospitalHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-surface px-5 py-4 sm:px-8 lg:px-10">
      <button
        aria-label="Buka menu"
        className="rounded-lg p-2 text-label hover:bg-surface-muted lg:hidden"
        onClick={onOpenMenu}
        type="button"
      >
        <Menu aria-hidden="true" className="size-5" />
      </button>

      <div className="hidden flex-col text-sm text-muted sm:flex">
        <p className="text-2xl font-bold text-primary">{title}</p>
        <span className="font-normal text-heading">
          Ringkasan ketersediaan darah dan permintaan rumah sakit
        </span>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <span className="flex size-8 items-center justify-center rounded-full bg-primary-100 text-primary">
          <UserRound aria-hidden="true" className="size-4" />
        </span>
        <span className="hidden text-sm font-bold text-heading sm:block">{adminName}</span>
        <span className="hidden h-7 w-px bg-border sm:block" />
        <button
          aria-label="Notifikasi"
          className="rounded-lg p-2 text-muted hover:bg-surface-muted"
          type="button"
        >
          <Bell aria-hidden="true" className="size-5" />
        </button>
      </div>
    </header>
  )
}
