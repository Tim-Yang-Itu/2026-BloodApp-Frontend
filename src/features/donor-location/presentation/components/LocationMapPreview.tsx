import type { LocationSummaryDto } from '../../application/dto/donor-location.dto'

/** Posisi pin pada ilustrasi peta, mengikuti urutan lokasi. */
const PIN_POSITIONS = [
  { left: '58%', top: '44%' },
  { left: '70%', top: '36%' },
  { left: '30%', top: '53%' },
  { left: '74%', top: '53%' },
  { left: '56%', top: '60%' },
  { left: '70%', top: '66%' },
] as const

const STREETS = [
  'left-[16%] top-0 h-full w-[9%]',
  'left-[49%] top-0 h-full w-[10%]',
  'left-[82%] top-0 h-full w-[8%]',
  'top-[20%] left-0 h-[7%] w-full',
  'top-[48%] left-0 h-[8%] w-full',
  'top-[76%] left-0 h-[6%] w-full',
] as const

function mapsHref(location: LocationSummaryDto | null): string {
  if (!location) {
    return 'https://www.google.com/maps'
  }
  const query = encodeURIComponent(`${location.name}, ${location.city}`)
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

type LocationMapPreviewProps = {
  locations: readonly LocationSummaryDto[]
  selectedId: string | null
  onSelect: (locationId: string) => void
}

/**
 * Ilustrasi peta beserta pin lokasi.
 * Belum terhubung ke layanan peta sungguhan; tombol "Buka Peta" membuka Google Maps.
 */
export function LocationMapPreview({ locations, selectedId, onSelect }: LocationMapPreviewProps) {
  const selected = locations.find((location) => location.id === selectedId) ?? locations[0] ?? null

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-surface-highlight">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-success/10" />
        <div className="absolute bottom-0 left-0 h-[28%] w-full bg-primary-100" />
        <div className="absolute top-[8%] left-[4%] h-[10%] w-[12%] bg-surface" />
        <div className="absolute top-[30%] left-[62%] h-[14%] w-[16%] bg-surface" />
        <div className="absolute top-[60%] left-[8%] h-[12%] w-[10%] bg-surface" />
        {STREETS.map((street) => (
          <div className={`absolute bg-surface ${street}`} key={street} />
        ))}
      </div>

      {locations.map((location, index) => {
        const position = PIN_POSITIONS[index % PIN_POSITIONS.length]
        const isActive = location.id === selected?.id

        return (
          <button
            aria-label={`Pilih ${location.name}`}
            aria-pressed={isActive}
            className={`absolute flex size-8 -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] cursor-pointer items-center justify-center rounded-[50%_50%_50%_0] border-0 text-on-primary shadow-field transition-transform ${
              isActive
                ? 'scale-110 bg-primary-active ring-4 ring-primary-200'
                : 'bg-primary hover:scale-110'
            }`}
            key={location.id}
            onClick={() => onSelect(location.id)}
            style={position}
            type="button"
          >
            <span className="rotate-45 text-xs font-bold">{index + 1}</span>
          </button>
        )
      })}

      <p className="absolute bottom-4 left-4 m-0 max-w-[62%] rounded-lg border border-border bg-surface/95 px-3 py-2 text-xs leading-snug text-muted">
        Ilustrasi peta, belum terhubung peta asli
      </p>

      <a
        className="absolute right-4 bottom-4 inline-flex items-center justify-center rounded-lg border border-primary bg-surface px-4 py-2 text-sm font-semibold text-primary no-underline transition-colors hover:bg-primary-50"
        href={mapsHref(selected)}
        rel="noreferrer"
        target="_blank"
      >
        Buka Peta
      </a>
    </div>
  )
}
