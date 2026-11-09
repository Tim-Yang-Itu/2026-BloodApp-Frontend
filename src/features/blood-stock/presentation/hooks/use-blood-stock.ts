import { useCallback, useEffect, useState } from 'react'

import { BLOOD_TYPES } from '@/shared/domain/blood'

import type {
  CreateBloodBagInput,
  StockBagDto,
  StockSummaryDto,
} from '../../application/dto/blood-stock.dto'
import { useBloodStockUseCases } from '../contexts/blood-stock-context'

const EMPTY_SUMMARY: StockSummaryDto = {
  total: 0,
  expiringSoon: 0,
  expired: 0,
  groups: BLOOD_TYPES.map((bloodType) => ({ bloodType, positive: 0, negative: 0, total: 0 })),
  critical: [],
}

type UseBloodStockResult = {
  bags: StockBagDto[]
  summary: StockSummaryDto
  isLoading: boolean
  error: string | null
  today: string
  addBag: (input: CreateBloodBagInput) => Promise<void>
  reload: () => void
}

/** Memuat kantong dan ringkasan stok sekaligus. */
export function useBloodStock(): UseBloodStockResult {
  const { listStock, getStockSummary, createBloodBag, today } = useBloodStockUseCases()
  const [bags, setBags] = useState<StockBagDto[]>([])
  const [summary, setSummary] = useState<StockSummaryDto>(EMPTY_SUMMARY)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [version, setVersion] = useState(0)

  useEffect(() => {
    let isActive = true

    async function load() {
      try {
        const [nextBags, nextSummary] = await Promise.all([listStock(), getStockSummary()])

        if (!isActive) {
          return
        }

        setBags(nextBags)
        setSummary(nextSummary)
        setError(null)
      } catch {
        if (!isActive) {
          return
        }

        setBags([])
        setSummary(EMPTY_SUMMARY)
        setError('Data stok gagal dimuat.')
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
  }, [getStockSummary, listStock, version])

  const reload = useCallback(() => {
    setVersion((current) => current + 1)
  }, [])

  const addBag = useCallback(
    async (input: CreateBloodBagInput) => {
      await createBloodBag(input)
      reload()
    },
    [createBloodBag, reload],
  )

  return { bags, summary, isLoading, error, today, addBag, reload }
}
