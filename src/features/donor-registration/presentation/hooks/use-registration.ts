import { useEffect, useState } from 'react'

import type { RegistrationDto } from '../../application/dto/donor-registration.dto'
import { useRegistrationUseCases } from '../contexts/registration-context'

type UseRegistrationResult = {
  registration: RegistrationDto | null
  isLoading: boolean
  notFound: boolean
}

/** Memuat satu tiket berdasarkan kode booking. */
export function useRegistration(bookingCode: string | undefined): UseRegistrationResult {
  const { getRegistration } = useRegistrationUseCases()

  const [registration, setRegistration] = useState<RegistrationDto | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let isActive = true

    async function load() {
      if (!bookingCode) {
        if (isActive) {
          setNotFound(true)
          setIsLoading(false)
        }
        return
      }

      try {
        const result = await getRegistration(bookingCode)

        if (!isActive) {
          return
        }

        setRegistration(result)
        setNotFound(!result)
      } catch {
        if (isActive) {
          setRegistration(null)
          setNotFound(true)
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    void load()

    return () => {
      isActive = false
    }
  }, [getRegistration, bookingCode])

  return { registration, isLoading, notFound }
}
