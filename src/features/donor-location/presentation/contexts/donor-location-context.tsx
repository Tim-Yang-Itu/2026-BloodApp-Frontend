import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

import type { GetLocationDetail } from '../../application/use-cases/get-location-detail.use-case'
import type { ListLocations } from '../../application/use-cases/list-locations.use-case'

/** Use case fitur `donor-location` yang dibagikan ke seluruh halaman fitur ini. */
export type DonorLocationUseCases = {
  listLocations: ListLocations
  getLocationDetail: GetLocationDetail
}

const DonorLocationContext = createContext<DonorLocationUseCases | null>(null)

type DonorLocationProviderProps = {
  useCases: DonorLocationUseCases
  children: ReactNode
}

/**
 * Menyediakan use case hasil perakitan `src/app/container.ts`.
 * Presentation tidak pernah membuat repository atau use case sendiri.
 */
export function DonorLocationProvider({ useCases, children }: DonorLocationProviderProps) {
  return <DonorLocationContext.Provider value={useCases}>{children}</DonorLocationContext.Provider>
}

export function useDonorLocationUseCases(): DonorLocationUseCases {
  const useCases = useContext(DonorLocationContext)

  if (!useCases) {
    throw new Error('useDonorLocationUseCases harus dipakai di dalam <DonorLocationProvider>.')
  }

  return useCases
}
