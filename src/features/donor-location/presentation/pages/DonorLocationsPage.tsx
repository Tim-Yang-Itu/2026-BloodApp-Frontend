import { useDeferredValue, useState } from 'react'

import { PublicNavbar } from '@/shared/ui'

import { LocationListCard } from '../components/LocationListCard'
import { LocationMapPreview } from '../components/LocationMapPreview'
import { LocationSearchBar } from '../components/LocationSearchBar'
import { useLocations } from '../hooks/use-locations'

const DEFAULT_CITY = 'Surabaya'

type DonorLocationsPageProps = {
  /**
   * Ditampilkan di dalam area pendonor: navbar publik disembunyikan dan
   * tautan detail menuju rute area pendonor, bukan halaman publik.
   */
  embedded?: boolean
}

/**
 * PDN-02 + EXT-03: halaman daftar lokasi donor.
 * Terbuka tanpa login; pencarian, filter kota, dan peta ilustrasi.
 */
export function DonorLocationsPage({ embedded = false }: DonorLocationsPageProps) {
  const [query, setQuery] = useState('')
  const [city, setCity] = useState(DEFAULT_CITY)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const deferredQuery = useDeferredValue(query)
  const { locations, total, cities, cityLabel, isLoading, error } = useLocations({
    query: deferredQuery,
    city,
  })

  const selected = locations.find((location) => location.id === selectedId) ?? locations[0] ?? null

  function handleReset() {
    setQuery('')
    setCity(DEFAULT_CITY)
    setSelectedId(null)
  }

  const detailBasePath = embedded ? '/jadwal-donor' : '/lokasi-donor'

  // Di dalam area pendonor, ukuran & padding mengikuti halaman fitur lain
  // (dashboard, tiket, form donor) agar tampilan konsisten.
  const containerClass = embedded
    ? 'w-full px-6 py-10 pb-20'
    : 'mx-auto w-[calc(100%-3rem)] max-w-[1180px] py-10 pb-20'

  return (
    <div className={embedded ? 'w-full' : 'min-h-screen bg-background'}>
      {embedded ? null : <PublicNavbar activeNav="lokasi" showAuthActions={false} />}

      <main className={containerClass}>
        <header>
          {embedded ? (
            <p className="m-0 text-xs font-bold tracking-[0.12em] text-primary uppercase">
              Cari jadwal donor
            </p>
          ) : null}
          <h1
            className={
              embedded
                ? 'mt-1.5 mb-0 text-3xl font-bold tracking-[-0.02em] text-heading'
                : 'text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.015em] text-heading'
            }
          >
            Lokasi Donor Darah
          </h1>
          <p className={embedded ? 'mt-2 mb-0 text-sm text-muted' : 'mt-2 text-muted'}>
            {embedded
              ? 'Temukan tempat donor terdekat, lalu pilih jadwal dan isi form donor.'
              : 'Temukan tempat donor terdekat. Tidak perlu login untuk melihat lokasi.'}
          </p>
        </header>

        <div className={embedded ? 'mt-6' : 'mt-7'}>
          <LocationSearchBar
            cities={cities}
            city={city}
            onCityChange={(value) => {
              setCity(value)
              setSelectedId(null)
            }}
            onQueryChange={setQuery}
            onReset={handleReset}
            query={query}
          />
        </div>

        <p aria-live="polite" className="mt-6 text-sm text-muted">
          {isLoading ? 'Memuat lokasi…' : `${total} lokasi ditemukan di ${cityLabel}`}
        </p>

        <div className="mt-4 grid items-start gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-3">
            {error ? (
              <p className="m-0 rounded-xl border border-border bg-surface p-6 text-sm text-danger">
                {error}
              </p>
            ) : null}

            {!error && !isLoading && locations.length === 0 ? (
              <div className="rounded-xl border border-border bg-surface p-8 text-center">
                <h2 className="text-lg font-bold text-heading">Lokasi tidak ditemukan</h2>
                <p className="mt-1 text-sm text-muted">
                  Coba kata kunci lain atau lihat semua kota.
                </p>
                <button
                  className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-hover"
                  onClick={handleReset}
                  type="button"
                >
                  Reset pencarian
                </button>
              </div>
            ) : null}

            {locations.map((location, index) => (
              <LocationListCard
                detailBasePath={detailBasePath}
                index={index}
                isSelected={location.id === selected?.id}
                key={location.id}
                location={location}
                onSelect={() => setSelectedId(location.id)}
              />
            ))}
          </div>

          <div className="lg:sticky lg:top-24">
            <LocationMapPreview
              locations={locations}
              onSelect={setSelectedId}
              selectedId={selected?.id ?? null}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default DonorLocationsPage
