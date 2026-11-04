import { CalendarDays, ClipboardList, Ticket } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { shortNameOf, useAuth } from '@/features/auth'
import { formatShortDate } from '@/shared/utils/format-date'

import type { RegistrationDto } from '../../application/dto/donor-registration.dto'
import { useRegistrations } from '../hooks/use-registrations'

const primaryLinkClass =
  'inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary no-underline transition-colors hover:bg-primary-hover'

const outlineLinkClass =
  'inline-flex min-h-11 items-center justify-center rounded-lg border border-primary px-5 py-2.5 text-sm font-semibold text-primary no-underline transition-colors hover:bg-primary-50'

function StatCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-field">
      <span className="grid size-9 place-items-center rounded-full bg-primary-50 text-primary">
        {icon}
      </span>
      <p className="mt-3 mb-0 text-xs text-muted">{label}</p>
      <p className="mt-1 mb-0 text-lg font-bold text-heading">{value}</p>
    </div>
  )
}

function NextTicketCard({ registration }: { registration: RegistrationDto }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-field">
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

      <div className="mt-5 flex flex-wrap gap-3">
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
    <div className="w-full px-6 py-10 pb-20">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="m-0 text-xs font-bold tracking-[0.12em] text-primary uppercase">
            Dashboard pendonor
          </p>
          <h1 className="mt-1.5 mb-0 text-3xl font-bold tracking-[-0.02em] text-heading">
            Halo, {name}
          </h1>
          <p className="mt-2 mb-0 text-sm text-muted">
            Cek jadwal donor terdekat atau lihat tiket yang sudah kamu daftarkan.
          </p>
        </div>
        <Link className={primaryLinkClass} to="/jadwal-donor">
          Cari lokasi donor
        </Link>
      </header>

      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={<Ticket aria-hidden="true" className="size-4" />}
          label="Tiket aktif"
          value={String(active.length)}
        />
        <StatCard
          icon={<ClipboardList aria-hidden="true" className="size-4" />}
          label="Total donor selesai"
          value={String(completed.length)}
        />
        <StatCard
          icon={<CalendarDays aria-hidden="true" className="size-4" />}
          label="Donor terakhir"
          value={lastCompleted ? formatShortDate(lastCompleted.date) : 'Belum pernah'}
        />
      </dl>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <section>
          <h2 className="m-0 text-sm font-bold text-heading">Jadwal berikutnya</h2>

          <div className="mt-3">
            {isLoading ? (
              <p className="m-0 rounded-2xl border border-border bg-surface p-6 text-sm text-muted">
                Memuat jadwal…
              </p>
            ) : nextTicket ? (
              <NextTicketCard registration={nextTicket} />
            ) : (
              <div className="rounded-2xl border border-dashed border-border-strong bg-surface p-6">
                <h3 className="m-0 text-base font-bold text-heading">Belum ada jadwal donor</h3>
                <p className="mt-2 mb-0 max-w-[380px] text-sm leading-relaxed text-muted">
                  Pilih lokasi donor terdekat, lalu isi form donor dan dapatkan tiket digitalmu.
                </p>
                <Link className={`${primaryLinkClass} mt-4`} to="/jadwal-donor">
                  Cari lokasi donor
                </Link>
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="m-0 text-sm font-bold text-heading">Riwayat donor</h2>
            <Link className="text-xs font-semibold text-primary no-underline hover:underline" to="/tiket-saya">
              Semua
            </Link>
          </div>

          <ul className="mt-3 list-none space-y-2.5 p-0">
            {completed.length === 0 ? (
              <li className="rounded-xl border border-border bg-surface px-4 py-3 text-xs text-muted">
                Belum ada riwayat donor.
              </li>
            ) : (
              completed.map((item) => (
                <li className="rounded-xl border border-border bg-surface px-4 py-3" key={item.id}>
                  <p className="m-0 text-sm font-semibold text-foreground">
                    {formatShortDate(item.date)}
                  </p>
                  <p className="mt-0.5 mb-0 text-xs text-muted">{item.locationName}</p>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </div>
  )
}
