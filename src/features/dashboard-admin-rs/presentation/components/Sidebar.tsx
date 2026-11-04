import { LogOut, Settings, UserRound, X } from "lucide-react";

import { NAV_ITEMS } from "../data";
import type { DashboardTab } from "../types";

type SidebarProps = {
  activeTab: DashboardTab;
  isOpen: boolean;
  onNavigate: (tab: DashboardTab) => void;
  onClose: () => void;
};

function DropMark() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2.4c3.2 4.1 6.6 8 6.6 11.6a6.6 6.6 0 1 1-13.2 0C5.4 10.4 8.8 6.5 12 2.4Z" />
    </svg>
  );
}

export function Sidebar({
  activeTab,
  isOpen,
  onNavigate,
  onClose,
}: SidebarProps) {
  return (
    <>
      {isOpen ? (
        <button
          aria-label="Tutup menu"
          className="fixed inset-0 z-30 bg-heading/20 lg:hidden"
          onClick={onClose}
        />
      ) : null}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-[264px] flex-col border-r border-border bg-surface px-5 py-6 transition-transform lg:sticky lg:top-0 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-2">
          <a href="/">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-on-primary">
                <DropMark />
              </span>
              <p className="text-xl font-bold text-heading">DonorKu</p>
            </div>
          </a>
          <button
            aria-label="Tutup sidebar"
            className="rounded-lg p-2 text-muted hover:bg-surface-muted lg:hidden"
            onClick={onClose}
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-10">
          <p className="px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
            Menu utama
          </p>
          <nav aria-label="Navigasi dashboard" className="mt-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-colors ${item.id === activeTab ? "bg-primary-50 text-primary" : "text-label hover:bg-surface-muted"}`}
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  type="button"
                >
                  <Icon className="size-[18px]" />
                  {item.label}
                  {item.id === "requests" ? (
                    <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-[10px] text-on-primary">
                      2
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto space-y-1 border-t border-border pt-5">
          <button
            className="flex w-full items-center cursor-pointer gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-label hover:bg-surface-muted"
            type="button"
          >
            <Settings className="size-[18px]" />
            Pengaturan
          </button>
          <a href="/">
            <button
              className="flex w-full items-center cursor-pointer gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-600 hover:bg-surface-muted"
              type="button"
            >
              <LogOut className="size-[18px]" />
              Keluar
            </button>
          </a>
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-surface-muted p-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary-100 text-primary">
              <UserRound className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-heading">
                RS Sehat Sentosa
              </p>
              <p className="truncate text-[11px] text-muted">
                Admin Rumah Sakit
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
