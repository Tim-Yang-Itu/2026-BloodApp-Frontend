import { Link } from 'react-router-dom'

import { outlineLinkClass, primaryLinkClass } from './link-styles'

type DonationIntentCardProps = {
  locationId: string
  locationName: string
  locationAddress: string
  /** Tanggal kalender `yyyy-mm-dd` untuk dicatat pada pendaftaran. */
  date: string
  /** Jam mulai `HH.mm`. */
  time: string
  dateLabel: string
  timeLabel: string
  /** Halaman daftar lokasi yang sedang dipakai (publik atau area pendonor). */
  listHref?: string
  /**
   * Bila diisi, tombol "Saya Ingin Donor" memanggil aksi ini (mis. menampilkan
   * form donor di halaman yang sama) alih-alih berpindah rute.
   */
  onPrimaryAction?: () => void
}

/**
 * Menyusun tautan form donor sambil membawa jadwal yang dipilih.
 * Rute ini dijaga `RequireAuth`, jadi pengguna anonim otomatis diarahkan
 * ke login/daftar lalu kembali ke form dengan jadwal yang sama.
 */
function formDonorHref({
  locationId,
  locationName,
  locationAddress,
  date,
  time,
}: Omit<DonationIntentCardProps, 'dateLabel' | 'timeLabel'>): string {
  const params = new URLSearchParams({
    location: locationId,
    name: locationName,
    address: locationAddress,
    date,
    time,
  })

  return `/form-donor?${params.toString()}`
}

/**
 * Panel ringkasan pilihan donor + ajakan lanjut (PDN-04: akun diminta
 * saat pengguna memutuskan ingin donor).
 */
export function DonationIntentCard(props: DonationIntentCardProps) {
  const { locationName, dateLabel, timeLabel, listHref = '/lokasi-donor', onPrimaryAction } = props

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
        {onPrimaryAction ? (
          <button className={`${primaryLinkClass} cursor-pointer`} onClick={onPrimaryAction} type="button">
            Saya Ingin Donor
          </button>
        ) : (
          <Link className={primaryLinkClass} to={formDonorHref(props)}>
            Saya Ingin Donor
          </Link>
        )}
        <Link className={outlineLinkClass} to={listHref}>
          Belum, lihat lokasi lain
        </Link>
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-muted">
        {onPrimaryAction
          ? 'Form donor dan screening kesehatan langsung terbuka di halaman ini.'
          : 'Kamu akan diminta daftar atau masuk, lalu mengisi form dan screening kesehatan.'}
      </p>
    </aside>
  )
}
