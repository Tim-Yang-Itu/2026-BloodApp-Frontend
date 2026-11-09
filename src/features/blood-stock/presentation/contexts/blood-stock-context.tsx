import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

import type { CreateBloodBag } from '../../application/use-cases/create-blood-bag.use-case'
import type { GetStockSummary } from '../../application/use-cases/get-stock-summary.use-case'
import type { ListStock } from '../../application/use-cases/list-stock.use-case'

/** Use case fitur `blood-stock` yang dibagikan ke halaman UTD. */
export type BloodStockUseCases = {
  /** Tanggal acuan perhitungan status & kedaluwarsa. */
  today: string
  listStock: ListStock
  getStockSummary: GetStockSummary
  createBloodBag: CreateBloodBag
}

const BloodStockContext = createContext<BloodStockUseCases | null>(null)

type BloodStockProviderProps = {
  /** Hasil `createBloodStockModule()` dari `src/app/container.ts`. */
  useCases: BloodStockUseCases
  children: ReactNode
}

/** Menyediakan use case stok darah hasil perakitan `src/app/container.ts`. */
export function BloodStockProvider({ useCases, children }: BloodStockProviderProps) {
  return <BloodStockContext.Provider value={useCases}>{children}</BloodStockContext.Provider>
}

export function useBloodStockUseCases(): BloodStockUseCases {
  const useCases = useContext(BloodStockContext)

  if (!useCases) {
    throw new Error('useBloodStockUseCases harus dipakai di dalam <BloodStockProvider>.')
  }

  return useCases
}
