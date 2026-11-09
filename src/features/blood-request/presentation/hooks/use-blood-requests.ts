import { useCallback, useEffect, useState } from 'react'

import type { BloodRequestDto } from '../../application/dto/blood-request.dto'
import { useBloodRequestUseCases } from '../contexts/blood-request-context'

type UseBloodRequestsResult = {
  requests: BloodRequestDto[]
  isLoading: boolean
  error: string | null
  approve: (requestId: string) => Promise<void>
  reject: (requestId: string, reason: string) => Promise<void>
  reload: () => void
}

/** Memuat daftar permintaan RS beserta aksi verifikasi. */
export function useBloodRequests(): UseBloodRequestsResult {
  const { listRequests, approveRequest, rejectRequest } = useBloodRequestUseCases()
  const [requests, setRequests] = useState<BloodRequestDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [version, setVersion] = useState(0)

  useEffect(() => {
    let isActive = true

    async function load() {
      try {
        const nextRequests = await listRequests()

        if (!isActive) {
          return
        }

        setRequests(nextRequests)
        setError(null)
      } catch {
        if (!isActive) {
          return
        }

        setRequests([])
        setError('Daftar permintaan gagal dimuat.')
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
  }, [listRequests, version])

  const reload = useCallback(() => {
    setVersion((current) => current + 1)
  }, [])

  const approve = useCallback(
    async (requestId: string) => {
      await approveRequest(requestId)
      reload()
    },
    [approveRequest, reload],
  )

  const reject = useCallback(
    async (requestId: string, reason: string) => {
      await rejectRequest(requestId, reason)
      reload()
    },
    [rejectRequest, reload],
  )

  return { requests, isLoading, error, approve, reject, reload }
}
