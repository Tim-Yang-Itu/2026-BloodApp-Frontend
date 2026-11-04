import { Link } from 'react-router-dom'

import type { LocationSummaryDto } from '../../application/dto/donor-location.dto'

type LocationListCardProps = {
  index: number
  location: LocationSummaryDto
  isSelected: boolean
  onSelect: () => void
  /** Awalan URL halaman detail, mis. `/lokasi-donor` atau `/jadwal-donor`. */
  detailBasePath?: string
}

/** Satu kartu lokasi pada daftar lokasi donor (PDN-02). */
export function LocationListCard({
  index,
  location,
  isSelected,
  onSelect,
  detailBasePath = '/lokasi-donor',
}: LocationListCardProps) {
  return (
    <article
      aria-pressed={isSelected}
      className={`flex cursor-pointer gap-4 rounded-xl border bg-surface p-5 transition-colors ${
        isSelected ? 'border-primary shadow-sm' : 'border-border hover:border-border-strong'
      }`}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSelect()
        }
      }}
      role="button"
      tabIndex={0}
    >
      <span
        aria-hidden="true"
        className="grid size-11 shrink-0 place-items-center self-start rounded-full bg-primary-100 text-sm font-bold text-primary"
      >
        {index + 1}
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="text-lg leading-snug font-bold text-heading">
            {location.name}{' '}
            <span className="text-xs font-bold tracking-[0.04em] text-primary">
              {location.typeLabel}
            </span>
          </h3>
          <p className="mt-1 text-sm text-muted">
            {location.address}, {location.city}
          </p>
          <p className="mt-0.5 text-sm text-muted">{location.scheduleLabel}</p>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
          <span className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
            {location.quotaLabel}
          </span>
          <span className="text-sm text-muted">{location.distanceLabel}</span>
          <Link
            className="rounded-lg border border-primary px-4 py-1.5 text-xs font-semibold text-primary no-underline transition-colors hover:bg-primary-50"
            onClick={(event) => event.stopPropagation()}
            to={`${detailBasePath}/${location.id}`}
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </article>
  )
}
