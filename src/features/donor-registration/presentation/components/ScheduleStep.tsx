import { Link } from 'react-router-dom'

import { labelClass } from '@/shared/ui'

const FLOW_STEPS = [
  'Pendaftaran',
  'Kuesioner',
  'Pemeriksaan awal',
  'Pengambilan darah',
  'Istirahat',
] as const

type ScheduleStepProps = {
  locationName: string
  locationAddress: string
  dateLabel: string
  time: string
}

/**
 * Langkah 1: ringkasan jadwal yang dipilih dari detail lokasi.
 * Jadwal tidak diubah di sini agar kuota kursi tetap dihitung per jam layanan.
 */
export function ScheduleStep({
  locationName,
  locationAddress,
  dateLabel,
  time,
}: ScheduleStepProps) {
  return (
    <div>
      <h2 className="text-lg font-bold text-heading">Jadwal donor</h2>

      <div className="mt-6 space-y-5">
        <div>
          <span className={labelClass}>Lokasi</span>
          <div className="rounded-lg border border-border bg-surface px-3.5 py-2.5 shadow-field">
            <p className="m-0 text-sm font-semibold text-foreground">{locationName}</p>
            <p className="m-0 text-xs text-muted">{locationAddress}</p>
          </div>
          <Link
            className="mt-2 inline-block text-xs font-semibold text-primary hover:underline"
            to="/jadwal-donor"
          >
            Ganti lokasi atau jadwal
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <span className={labelClass}>Tanggal</span>
            <p className="m-0 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm font-semibold text-foreground shadow-field">
              {dateLabel}
            </p>
          </div>
          <div>
            <span className={labelClass}>Jam</span>
            <p className="m-0 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm font-semibold text-foreground shadow-field">
              {time}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-surface-muted p-5">
        <h3 className="m-0 text-sm font-bold text-heading">Alur di lokasi</h3>
        <ul className="mt-3 flex list-none flex-wrap gap-2 p-0">
          {FLOW_STEPS.map((step, index) => (
            <li
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs font-semibold text-foreground"
              key={step}
            >
              <span className="text-primary">{index + 1}</span>
              {step}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-muted">
          Total sekitar 45 menit sampai 1 jam, pengambilan darahnya sendiri sekitar 8 sampai 15
          menit.
        </p>
      </div>
    </div>
  )
}
