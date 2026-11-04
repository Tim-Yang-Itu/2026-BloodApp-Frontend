import { useEffect, useState } from 'react'

import type { LocationDetailDto } from '../../application/dto/donor-location.dto'
import { useDonorLocationUseCases } from '../contexts/donor-location-context'

type UseLocationDetailResult = {
  detail: LocationDetailDto | null
  isLoading: boolean
  notFound: boolean
  error: string | null
}

/** Memuat satu lokasi donor beserta jadwalnya (PDN-03). */
export function useLocationDetail(locationId: string | undefined): UseLocationDetailResult {
  const { getLocationDetail } = useDonorLocationUseCases()

  const [detail, setDetail] = useState<LocationDetailDto | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true

    if (!locationId) {
      setDetail(null)
      setNotFound(true)
      setIsLoading(false)
      return () => {
        isActive = false
      }
    }

    setIsLoading(true)
    setNotFound(false)
    setError(null)

    getLocationDetail(locationId)
      .then((result) => {
        if (!isActive) {
          return
        }
        setDetail(result)
        setNotFound(result === null)
        setIsLoading(false)
      })
      .catch(() => {
        if (!isActive) {
          return
        }
        setDetail(null)
        setError('Detail lokasi gagal dimuat. Coba muat ulang halaman.')
        setIsLoading(false)
      })

    return () => {
      isActive = false
    }
  }, [getLocationDetail, locationId])

  return { detail, isLoading, notFound, error }
}
