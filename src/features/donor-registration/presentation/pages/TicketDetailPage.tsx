import { CheckCircle2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { Button } from '@/shared/ui'

import { TicketCard } from '../components/TicketCard'
import { useRegistration } from '../hooks/use-registration'

const primaryLinkClass =
  'inline-flex min-h-11 flex-1 items-center justify-center rounded-lg border border-primary px-5 py-2.5 text-sm font-semibold text-primary no-underline transition-colors hover:bg-primary-50'

const TIPS: readonly { title: string; items: readonly string[] }[] = [
  {
    title: 'Sebelum berangkat',
    items: [
      'Makan dan minum yang cukup sebelum donor',
      'Tidur cukup di malam sebelumnya',
      'Hindari rokok dua jam sebelum donor',
    ],
  },
  {
    title: 'Saat tiba di lokasi',
    items: [
      'Bawa KTP atau kartu identitas lain',
      'Tunjukkan QR Code ke petugas',
      'Petugas memeriksa ulang kesehatanmu',
    ],
  },
]

/** PDN-08: tiket digital berisi QR, kode booking, dan panduan singkat. */
export function TicketDetailPage() {
  const { bookingCode } = useParams()
  const { registration, isLoading, notFound } = useRegistration(bookingCode)

  if (isLoading) {
    return <p className="py-24 text-center text-sm text-muted">Memuat tiket…</p>
  }

  if (notFound || !registration) {
    return (
      <div className="w-full px-6 py-24 text-center">
        <h1 className="m-0 text-2xl font-bold text-heading">Tiket tidak ditemukan</h1>
        <p className="mt-2 text-sm text-muted">
          Kode booking yang kamu buka tidak ada. Cek lagi daftar tiket di halaman Tiket Saya.
        </p>
        <Link className={`${primaryLinkClass} mt-6 flex-1`} to="/tiket-saya">
          Lihat tiket saya
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full px-6 py-10 pb-20">
      <div className="rounded-2xl bg-success/10 px-5 py-4">
        <p className="m-0 flex items-center gap-2 text-sm font-bold text-success">
          <CheckCircle2 aria-hidden="true" className="size-4" />
          Pendaftaran donor berhasil
        </p>
        <p className="mt-1 mb-0 text-sm leading-relaxed text-success">
          Tunjukkan tiket ini ke petugas PMI saat kamu tiba di lokasi.
        </p>
      </div>

      <div className="mt-5">
        <TicketCard registration={registration} />
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button className="flex-1" onClick={() => window.print()} type="button">
          Simpan tiket
        </Button>
      </div>

      <div className="mt-5 grid gap-6 rounded-2xl border border-border bg-surface p-6 sm:grid-cols-2">
        {TIPS.map((tip) => (
          <div key={tip.title}>
            <h2 className="m-0 text-sm font-bold text-heading">{tip.title}</h2>
            <ul className="mt-2 list-none space-y-1.5 p-0">
              {tip.items.map((item) => (
                <li className="text-xs leading-relaxed text-muted" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
