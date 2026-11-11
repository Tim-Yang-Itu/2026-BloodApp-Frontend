import { CalendarDays, ClipboardList, Ticket } from 'lucide-react'
import { Link } from 'react-router-dom'

import { shortNameOf, useAuth } from '@/features/auth'
import { PageHeader, StatCard } from '@/shared/ui'
import { formatShortDate } from '@/shared/utils/format-date'

import type { RegistrationDto } from '../../application/dto/donor-registration.dto'
import { useRegistrations } from '../hooks/use-registrations'

const primaryLinkClass =
  'inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary no-underline transition-colors hover:bg-primary-hover'

const outlineLinkClass =
  'inline-flex min-h-11 items-center justify-center rounded-lg border border-primary px-5 py-2.5 text-sm font-semibold text-primary no-underline transition-colors hover:bg-primary-50'

/** Permukaan kartu dashboard: padding, radius, dan elevasi yang sama untuk semua kartu. */
const CARD_BASE = 'rounded-2xl border border-border bg-surface shadow-field'
const CARD_SOLID = `${CARD_BASE} p-5`
const CARD_DASHED = 'rounded-2xl border border-dashed border-border-strong bg-surface p-5'

function NextTicketCard({ registration }: { registration: RegistrationDto }) {
  return (
    <div className={`${CARD_SOLID} mt-3 flex grow flex-col`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-[11px] font-bold text-primary-800">
          Jadwal terdekat
        </span>
        <span className="text-xs text-muted">{registration.bookingCode}</span>
      </div>

      <h3 className="mt-4 mb-0 text-lg font-bold text-heading">{registration.locationName}</h3>
      <p className="mt-1 mb-0 text-xs text-muted">{registration.locationAddress}</p>

      <p className="mt-4 mb-0 text-sm font-semibold text-foreground">
        {registration.dateLabel} · {registration.time}
      </p>

      <div className="mt-auto flex flex-wrap gap-3 pt-5">
        <Link className={primaryLinkClass} to={`/tiket-saya/${registration.bookingCode}`}>
          Lihat tiket
        </Link>
        <Link className={outlineLinkClass} to="/jadwal-donor">
          Ganti jadwal
        </Link>
      </div>
    </div>
  )
}

/** PDN-07: beranda pendonor setelah login. */
export function DonorDashboardPage() {
  const { user } = useAuth()
  const { registrations, isLoading } = useRegistrations(user?.id)

  const name = user ? shortNameOf(user.profile.fullName) : 'Pendonor'
  const active = registrations.filter((item) => item.status === 'scheduled')
  const completed = registrations.filter((item) => item.status === 'completed')
  const nextTicket = active[0]
  const lastCompleted = completed[0]

  return (
    <div className="w-full">
      <PageHeader
        actions={
          <Link className={primaryLinkClass} to="/jadwal-donor">
            Cari lokasi donor
          </Link>
        }
        description="Cek jadwal donor terdekat atau lihat tiket yang sudah kamu daftarkan."
        eyebrow="Dashboard pendonor"
        title={`Halo, ${name}`}
      />

      <div className="mt-6 grid auto-rows-fr gap-4 sm:grid-cols-3">
        <StatCard icon={Ticket} label="Tiket aktif" value={String(active.length)} />
        <StatCard
          icon={ClipboardList}
          label="Total donor selesai"
          value={String(completed.length)}
        />
        <StatCard
          icon={CalendarDays}
          label="Donor terakhir"
          value={lastCompleted ? formatShortDate(lastCompleted.date) : 'Belum pernah'}
        />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <section className="flex flex-col">
          <h2 className="m-0 text-sm font-bold text-heading font-sans">Jadwal berikutnya</h2>

          {isLoading ? (
            <div className={`${CARD_SOLID} mt-3 flex grow items-center text-sm text-muted`}>
              Memuat jadwal…
            </div>
          ) : nextTicket ? (
            <NextTicketCard registration={nextTicket} />
          ) : (
            <div className={`${CARD_DASHED} mt-3 flex grow flex-col justify-center`}>
              <h3 className="m-0 text-base font-bold text-heading font-sans">Belum ada jadwal donor</h3>
              <p className="mt-2 mb-0 max-w-[380px] text-sm leading-relaxed text-muted">
                Pilih lokasi donor terdekat, lalu isi form donor dan dapatkan tiket digitalmu.
              </p>
              <Link className={`${primaryLinkClass} mt-4 self-start`} to="/jadwal-donor">
                Cari lokasi donor
              </Link>
            </div>
          )}
        </section>

        <section className="flex flex-col">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="m-0 text-sm font-bold text-heading font-sans">Riwayat donor</h2>
            <Link className="text-xs font-semibold text-primary no-underline hover:underline" to="/tiket-saya">
              Semua
            </Link>
          </div>

          {completed.length === 0 ? (
            <div className={`${CARD_DASHED} mt-3 flex grow flex-col justify-center`}>
              <p className="m-0 text-xs text-muted">Belum ada riwayat donor.</p>
            </div>
          ) : (
            <ul className={`${CARD_BASE} mt-3 flex grow list-none flex-col divide-y divide-border p-0`}>
              {completed.map((item) => (
                <li className="flex flex-col justify-center px-5 py-3.5" key={item.id}>
                  <p className="m-0 text-sm font-semibold text-foreground">
                    {formatShortDate(item.date)}
                  </p>
                  <p className="mt-0.5 mb-0 text-xs text-muted">{item.locationName}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
