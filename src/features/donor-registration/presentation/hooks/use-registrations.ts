import { useCallback, useEffect, useState } from 'react'

import type { RegistrationDto } from '../../application/dto/donor-registration.dto'
import { useRegistrationUseCases } from '../contexts/registration-context'

type UseRegistrationsResult = {
  registrations: RegistrationDto[]
  isLoading: boolean
  error: string | null
  /** Memuat ulang daftar, mis. setelah form donor dikirim. */
  reload: () => void
}

/** Memuat seluruh pendaftaran donor milik satu pengguna. */
export function useRegistrations(userId: string | undefined): UseRegistrationsResult {
  const { listRegistrations } = useRegistrationUseCases()

  const [registrations, setRegistrations] = useState<RegistrationDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [version, setVersion] = useState(0)

  useEffect(() => {
    let isActive = true

    async function load() {
      if (!userId) {
        if (isActive) {
          setRegistrations([])
          setIsLoading(false)
        }
        return
      }

      try {
        const result = await listRegistrations(userId)

        if (!isActive) {
          return
        }

        setRegistrations(result)
        setError(null)
      } catch {
        if (!isActive) {
          return
        }

        setRegistrations([])
        setError('Riwayat donor gagal dimuat.')
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
  }, [listRegistrations, userId, version])

  const reload = useCallback(() => {
    setVersion((current) => current + 1)
  }, [])

  return { registrations, isLoading, error, reload }
}
