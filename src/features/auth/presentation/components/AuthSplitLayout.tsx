import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type AuthSplitLayoutProps = {
  /** Kalimat besar di panel merah. */
  headline: ReactNode
  description: ReactNode
  /** Kartu informasi di bagian bawah panel merah (opsional). */
  aside?: ReactNode
  children: ReactNode
}

function DropMark() {
  return (
    <svg aria-hidden="true" className="size-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.4c3.2 4.1 6.6 8 6.6 11.6a6.6 6.6 0 1 1-13.2 0C5.4 10.4 8.8 6.5 12 2.4Z" />
    </svg>
  )
}

/**
 * Kerangka dua kolom untuk halaman autentikasi pendonor:
 * panel merek di kiri (merah, sesuai landing page) dan area form di kanan.
 * Dipakai bersama oleh halaman daftar dan masuk.
 */
export function AuthSplitLayout({ headline, description, aside, children }: AuthSplitLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-surface lg:flex-row">
      <aside className="relative overflow-hidden bg-primary text-on-primary lg:w-[44%] lg:max-w-[560px]">
        <div
          aria-hidden="true"
          className="panel-glow pointer-events-none absolute inset-0"
        />

        <div className="relative flex h-full flex-col justify-center gap-10 px-6 py-8 sm:px-10 lg:px-14 lg:py-12">
          <Link className="inline-flex w-fit items-center gap-2.5 text-on-primary no-underline" to="/">
            <span className="grid size-8 place-items-center rounded-full bg-surface text-primary">
              <DropMark />
            </span>
            <span className="text-lg font-bold tracking-tight">DarahTerpadu</span>
          </Link>

          <div className="max-w-md">
            <h1 className="text-[clamp(1.9rem,3.2vw,2.8rem)] leading-[1.14] font-bold tracking-[-0.015em]">
              {headline}
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-on-primary/75">{description}</p>
          </div>

          {aside ? <div className="max-w-md">{aside}</div> : null}
        </div>
      </aside>

      <main className="flex flex-1 justify-center px-5 py-10 sm:px-8 lg:items-center lg:py-6">
        <div className="w-full max-w-[520px]">{children}</div>
      </main>
    </div>
  )
}
