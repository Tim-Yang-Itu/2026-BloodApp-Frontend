import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

import type { BloodRequestModule } from '../../infrastructure/container'

const BloodRequestUseCasesContext = createContext<BloodRequestModule | null>(null)

type BloodRequestProviderProps = {
  useCases: BloodRequestModule
  children: ReactNode
}

export function BloodRequestProvider({ useCases, children }: BloodRequestProviderProps) {
  return (
    <BloodRequestUseCasesContext.Provider value={useCases}>
      {children}
    </BloodRequestUseCasesContext.Provider>
  )
}

export function useBloodRequestUseCases(): BloodRequestModule {
  const useCases = useContext(BloodRequestUseCasesContext)

  if (!useCases) {
    throw new Error('useBloodRequestUseCases harus dipakai di dalam BloodRequestProvider.')
  }

  return useCases
}
