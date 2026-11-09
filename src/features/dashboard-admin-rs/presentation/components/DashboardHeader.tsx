import { Bell, Menu, Search, UserRound } from "lucide-react";

export function DashboardHeader({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-surface px-5 py-4 sm:px-8 lg:px-10">
      <button
        aria-label="Buka menu"
        className="rounded-lg p-2 text-label hover:bg-surface-muted lg:hidden"
        onClick={onOpenMenu}
        type="button"
      >
        <Menu className="size-5" />
      </button>
      <div className="hidden text-sm text-muted sm:flex flex-col">
        <p className="font-bold text-primary text-2xl">Dashboard</p>
        <span className="font-normal text-heading">
          RS Harapan Sehat · ringkasan permintaan dan ketersediaan darah
        </span>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <button
          aria-label="Cari"
          className="hidden rounded-lg p-2 text-muted hover:bg-surface-muted sm:block"
          type="button"
        >
          <Search className="size-5" />
        </button>
        <button
          aria-label="Notifikasi"
          className="relative rounded-lg p-2 text-muted hover:bg-surface-muted"
          type="button"
        >
          <Bell className="size-5" />
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-primary" />
        </button>
        <span className="hidden h-7 w-px bg-border sm:block" />
        <div className="hidden items-center gap-2 sm:flex">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary-100 text-primary">
            <UserRound className="size-4" />
          </span>
          <span className="text-sm font-bold text-heading">Admin RS</span>
        </div>
      </div>
    </header>
  );
}
