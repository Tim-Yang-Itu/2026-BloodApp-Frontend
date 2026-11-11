import { Link } from 'react-router-dom'

import { useAuth } from '@/features/auth'
import { PageHeader } from '@/shared/ui'
import { formatLongDate } from '@/shared/utils/format-date'

import type { RegistrationDto } from '../../application/dto/donor-registration.dto'
import { useRegistrations } from '../hooks/use-registrations'

const primaryLinkClass =
  'inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary no-underline transition-colors hover:bg-primary-hover'

const STATUS_CLASS: Record<RegistrationDto['status'], string> = {
  scheduled: 'bg-primary-50 text-primary-800',
  completed: 'bg-success/10 text-success',
  cancelled: 'bg-danger/10 text-danger',
}

function TicketRow({ registration }: { registration: RegistrationDto }) {
  return (
    <li className="rounded-2xl border border-border bg-surface p-5 shadow-field">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="m-0 text-xs text-muted">{registration.bookingCode}</p>
          <h3 className="mt-1 mb-0 text-2xl font-bold text-heading font-sans">{registration.locationName}</h3>
          <p className="mt-0.5 mb-0 text-xs text-muted">{registration.locationAddress}</p>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold ${
            STATUS_CLASS[registration.status]
          }`}
        >
          {registration.statusLabel}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="m-0 text-sm font-semibold text-foreground">
          {formatLongDate(registration.date)} · {registration.time}
        </p>
        <Link
          className="text-xs font-semibold text-primary no-underline hover:underline"
          to={`/tiket-saya/${registration.bookingCode}`}
        >
          Lihat tiket
        </Link>
      </div>
    </li>
  )
}

/** Halaman "Tiket Saya": daftar tiket aktif + riwayat donor. */
export function MyTicketsPage() {
  const { user } = useAuth()
  const { registrations, isLoading, error } = useRegistrations(user?.id)

  const active = registrations.filter((item) => item.status === 'scheduled')
  const history = registrations.filter((item) => item.status !== 'scheduled')

  return (
    <div className="w-full">
      <PageHeader
        actions={
          <Link className={primaryLinkClass} to="/jadwal-donor">
            Donor lagi
          </Link>
        }
        description="Tiket yang belum dipakai dan riwayat donor yang sudah selesai."
        title="Tiket Saya"
      />

      {isLoading ? (
        <p className="mt-10 text-sm text-muted">Memuat tiket…</p>
      ) : null}

      {error ? (
        <p
          className="mt-8 rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 text-xs text-danger"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      {!isLoading && !error && registrations.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border-strong bg-surface p-10 text-center">
          <h2 className="m-0 text-base font-bold text-heading">Belum ada tiket donor</h2>
          <p className="mx-auto mt-2 mb-0 max-w-[380px] text-sm text-muted">
            Pilih lokasi donor terdekat, lalu daftar untuk mendapat tiket digital.
          </p>
          <Link className={`${primaryLinkClass} mt-5`} to="/jadwal-donor">
            Cari lokasi donor
          </Link>
        </div>
      ) : null}

      {active.length > 0 ? (
        <section className="mt-8">
          <h2 className="m-0 text-sm font-bold text-heading font-sans">Tiket aktif</h2>
          <ul className="mt-3 list-none space-y-3 p-0">
            {active.map((registration) => (
              <TicketRow key={registration.id} registration={registration} />
            ))}
          </ul>
        </section>
      ) : null}

      {history.length > 0 ? (
        <section className="mt-8">
          <h2 className="m-0 text-sm font-bold text-heading font-sans">Riwayat</h2>
          <ul className="mt-3 list-none space-y-3 p-0">
            {history.map((registration) => (
              <TicketRow key={registration.id} registration={registration} />
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}
