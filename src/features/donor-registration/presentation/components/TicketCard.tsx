import { Droplet } from 'lucide-react'

import type { RegistrationDto } from '../../application/dto/donor-registration.dto'
import { TicketQr } from './TicketQr'

const CHIP_BASE =
  'inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold'

type TicketCardProps = {
  registration: RegistrationDto
}

/** Kartu tiket digital: data donor di kiri, QR + kode booking di kanan. */
export function TicketCard({ registration }: TicketCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="p-6 sm:p-8">
          <p className="m-0 flex items-center gap-2 text-sm font-bold text-primary">
            <Droplet aria-hidden="true" className="size-3.5 fill-current" />
            Tiket Donor Darah
          </p>

          <p className="mt-5 mb-0 text-xs text-muted">Nama pendonor</p>
          <h2 className="mt-1 mb-0 text-2xl font-bold tracking-[-0.01em] text-heading">
            {registration.donorName}
          </h2>

          <dl className="mt-5 grid grid-cols-3 gap-4">
            <div>
              <dt className="m-0 text-xs text-muted">Golongan darah</dt>
              <dd className="m-0 mt-1 text-sm font-bold text-foreground">
                {registration.bloodTypeLabel}
              </dd>
            </div>
            <div>
              <dt className="m-0 text-xs text-muted">Tanggal</dt>
              <dd className="m-0 mt-1 text-sm font-bold text-foreground">
                {registration.dateLabel}
              </dd>
            </div>
            <div>
              <dt className="m-0 text-xs text-muted">Jam</dt>
              <dd className="m-0 mt-1 text-sm font-bold text-foreground">{registration.time}</dd>
            </div>
          </dl>

          <p className="mt-5 mb-0 text-xs text-muted">Lokasi</p>
          <p className="mt-1 mb-0 text-sm font-bold text-foreground">
            {registration.locationName}
          </p>
          <p className="mt-0.5 mb-0 text-xs text-muted">{registration.locationAddress}</p>

          <p
            className={`mt-5 mb-0 ${CHIP_BASE} ${
              registration.passedScreening
                ? 'bg-success/10 text-success'
                : 'bg-warning/10 text-warning'
            }`}
          >
            {registration.passedScreening ? 'Screening lolos' : 'Perlu dicek ulang'}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center border-t border-dashed border-primary-200 bg-primary-50 p-6 sm:p-8 lg:border-t-0 lg:border-l">
          <div className="rounded-xl bg-surface p-4 shadow-field">
            <TicketQr value={registration.bookingCode} />
          </div>
          <p className="mt-4 mb-0 text-xs text-muted">Kode booking</p>
          <p className="mt-1 mb-0 text-lg font-bold tracking-[0.06em] text-heading">
            {registration.bookingCode}
          </p>
        </div>
      </div>
    </article>
  )
}
