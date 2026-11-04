import { RotateCcw, Search } from 'lucide-react'

type LocationSearchBarProps = {
  query: string
  city: string
  cities: readonly string[]
  onQueryChange: (value: string) => void
  onCityChange: (value: string) => void
  onReset: () => void
}

/** Pencarian lokasi + filter kota (PDN-02, EXT-03). */
export function LocationSearchBar({
  query,
  city,
  cities,
  onQueryChange,
  onCityChange,
  onReset,
}: LocationSearchBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-3 shadow-sm md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-placeholder"
        />
        <input
          aria-label="Cari nama lokasi atau alamat"
          className="w-full rounded-lg border border-border bg-surface py-2.5 pr-4 pl-10 text-sm text-foreground outline-none transition placeholder:text-placeholder focus:border-primary focus:ring-2 focus:ring-primary-100"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Cari nama lokasi atau alamat"
          type="search"
          value={query}
        />
      </div>

      <select
        aria-label="Pilih kota"
        className="w-full cursor-pointer rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-100 md:w-52"
        onChange={(event) => onCityChange(event.target.value)}
        value={city}
      >
        <option value="">Semua kota</option>
        {cities.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <button
        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border-0 bg-transparent px-4 py-2.5 text-sm font-semibold text-muted transition-colors hover:text-primary"
        onClick={onReset}
        type="button"
      >
        <RotateCcw aria-hidden="true" className="size-4" />
        Reset
      </button>
    </div>
  )
}
