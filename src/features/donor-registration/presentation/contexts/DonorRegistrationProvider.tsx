import type { ReactNode } from 'react'

import { RegistrationContext } from './registration-context'
import type { DonorRegistrationUseCases } from './registration-context'

type DonorRegistrationProviderProps = {
  /** Hasil `createDonorRegistrationModule()` dari `src/app/container.ts`. */
  useCases: DonorRegistrationUseCases
  children: ReactNode
}

/** Menyediakan use case pendaftaran donor hasil perakitan `src/app/container.ts`. */
export function DonorRegistrationProvider({
  useCases,
  children,
}: DonorRegistrationProviderProps) {
  return (
    <RegistrationContext.Provider value={useCases}>{children}</RegistrationContext.Provider>
  )
}
