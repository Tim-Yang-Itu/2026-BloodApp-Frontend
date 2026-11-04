import { createContext, useContext } from 'react'

import type { GetRegistration } from '../../application/use-cases/get-registration.use-case'
import type { ListRegistrations } from '../../application/use-cases/list-registrations.use-case'
import type { SubmitRegistration } from '../../application/use-cases/submit-registration.use-case'

/** Use case fitur `donor-registration` yang dibagikan ke halaman pendonor. */
export type DonorRegistrationUseCases = {
  submitRegistration: SubmitRegistration
  listRegistrations: ListRegistrations
  getRegistration: GetRegistration
}

export const RegistrationContext = createContext<DonorRegistrationUseCases | null>(null)

export function useRegistrationUseCases(): DonorRegistrationUseCases {
  const useCases = useContext(RegistrationContext)

  if (!useCases) {
    throw new Error(
      'useRegistrationUseCases harus dipakai di dalam <DonorRegistrationProvider>.',
    )
  }

  return useCases
}
