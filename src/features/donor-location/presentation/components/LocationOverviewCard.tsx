import type { LocationDetailDto } from '../../application/dto/donor-location.dto'

type LocationOverviewCardProps = {
  detail: LocationDetailDto
}

/** Kartu identitas lokasi: jenis, status buka, alamat, jam, kontak, fasilitas. */
export function LocationOverviewCard({ detail }: LocationOverviewCardProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="m-0 text-xs font-bold tracking-[0.14em] text-primary uppercase">
          {detail.typeLabel}
        </p>
        {detail.openToday ? (
          <span className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
            Buka hari ini
          </span>
        ) : (
          <span className="rounded-full bg-surface-highlight px-2.5 py-1 text-xs font-semibold text-muted">
            Tutup hari ini
          </span>
        )}
      </div>

      <h1 className="mt-2 text-3xl font-bold tracking-[-0.015em] text-heading">
        {detail.name}
      </h1>
      <p className="mt-1 text-sm text-muted">{detail.addressLine}</p>

      <dl className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-surface-muted p-4">
          <dt className="text-xs text-muted">Jam operasional</dt>
          <dd className="mt-1 text-sm font-semibold text-foreground">
            {detail.operationalDays}
            <br />
            {detail.operationalHours}
          </dd>
        </div>
        <div className="rounded-lg bg-surface-muted p-4">
          <dt className="text-xs text-muted">Kontak</dt>
          <dd className="mt-1 text-sm font-semibold text-foreground">{detail.contact}</dd>
        </div>
        <div className="rounded-lg bg-surface-muted p-4">
          <dt className="text-xs text-muted">Fasilitas</dt>
          <dd className="mt-1 text-sm font-semibold text-foreground">
            {detail.facilities.join(', ')}
          </dd>
        </div>
      </dl>

      <div className="mt-6">
        <h2 className="text-sm font-semibold text-foreground font-sans">Golongan darah yang dibutuhkan</h2>
        <ul className="mt-3 flex list-none flex-wrap gap-2 p-0">
          {detail.neededBloodTypes.map((bloodType) => (
            <li
              className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary"
              key={bloodType}
            >
              {bloodType}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
