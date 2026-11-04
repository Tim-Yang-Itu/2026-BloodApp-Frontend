import { Link } from 'react-router-dom'

import { outlineLinkClass, primaryLinkClass } from './link-styles'

type DonationIntentCardProps = {
  locationName: string
  dateLabel: string
  timeLabel: string
}

/**
 * Panel ringkasan pilihan donor + ajakan lanjut (PDN-04: akun diminta
 * saat pengguna memutuskan ingin donor).
 */
export function DonationIntentCard({ locationName, dateLabel, timeLabel }: DonationIntentCardProps) {
  return (
    <aside className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <h2 className="text-xl font-bold text-heading">Ingin donor di sini?</h2>
      <p className="mt-1 text-sm text-muted">Cek jadwal pilihannya lalu lanjutkan.</p>

      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex items-start justify-between gap-4">
          <dt className="text-muted">Lokasi</dt>
          <dd className="m-0 max-w-[62%] text-right font-bold text-foreground">{locationName}</dd>
        </div>
        <div className="flex items-start justify-between gap-4">
          <dt className="text-muted">Tanggal</dt>
          <dd className="m-0 text-right font-bold text-foreground">{dateLabel}</dd>
        </div>
        <div className="flex items-start justify-between gap-4">
          <dt className="text-muted">Jam</dt>
          <dd className="m-0 text-right font-bold text-foreground">{timeLabel}</dd>
        </div>
      </dl>

      <div className="mt-6 space-y-3">
        <Link className={primaryLinkClass} to="/register">
          Saya Ingin Donor
        </Link>
        <Link className={outlineLinkClass} to="/lokasi-donor">
          Belum, lihat lokasi lain
        </Link>
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-muted">
        Kamu akan diminta daftar atau masuk, lalu mengisi form dan screening kesehatan.
      </p>
    </aside>
  )
}
