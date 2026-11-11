import type { ReactNode } from 'react'

type PageHeaderProps = {
  /** Label kecil di atas judul, mis. `Ketersediaan real time`. */
  eyebrow?: string
  title: string
  description?: string
  /** Tombol atau tautan di sisi kanan judul. */
  actions?: ReactNode
}

/** Judul halaman baku untuk seluruh area ber-peran (pendonor, UTD, RS). */
export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow ? (
          <p className="m-0 text-xs font-bold tracking-[0.12em] text-primary uppercase">{eyebrow}</p>
        ) : null}
        <h1
          className={`mb-0 text-3xl font-bold tracking-[-0.02em] text-heading ${eyebrow ? 'mt-1.5' : 'mt-0'}`}
        >
          {title}
        </h1>
        {description ? <p className="mt-2 mb-0 text-sm text-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </header>
  )
}
