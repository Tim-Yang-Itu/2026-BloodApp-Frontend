import { useEffect, useState } from 'react'

import type { LocationFilterInput, LocationSummaryDto } from '../../application/dto/donor-location.dto'
import { useDonorLocationUseCases } from '../contexts/donor-location-context'

type UseLocationsResult = {
  locations: LocationSummaryDto[]
  total: number
  cities: string[]
  cityLabel: string
  isLoading: boolean
  error: string | null
}

/**
 * Memuat daftar lokasi donor sesuai filter (PDN-02, EXT-03).
 * Filter dikirim sebagai nilai primitif agar effect hanya berjalan saat benar-benar berubah.
 */
export function useLocations(filter: LocationFilterInput): UseLocationsResult {
  const { listLocations } = useDonorLocationUseCases()
  const query = filter.query ?? ''
  const city = filter.city ?? ''
  const maxDistanceKm = filter.maxDistanceKm

  const [locations, setLocations] = useState<LocationSummaryDto[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [cityLabel, setCityLabel] = useState('semua kota')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true
    setIsLoading(true)
    setError(null)

    listLocations({ query, city: city || undefined, maxDistanceKm })
      .then((result) => {
        if (!isActive) {
          return
        }
        setLocations(result.locations)
        setCities(result.cities)
        setCityLabel(result.cityLabel)
        setIsLoading(false)
      })
      .catch(() => {
        if (!isActive) {
          return
        }
        setLocations([])
        setError('Daftar lokasi gagal dimuat. Coba muat ulang halaman.')
        setIsLoading(false)
      })

    return () => {
      isActive = false
    }
  }, [listLocations, query, city, maxDistanceKm])

  return { locations, total: locations.length, cities, cityLabel, isLoading, error }
}
