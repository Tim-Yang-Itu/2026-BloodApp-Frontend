import { useMemo } from 'react'
import type { ReactNode } from 'react'
import {
  DEMO_ACTIVE_REGISTRATION,
  DEMO_BLOOD_BAGS,
  DEMO_BLOOD_REQUESTS,
  DEMO_DONATION_HISTORY,
  DEMO_DONOR_LOCATIONS,
  DEMO_DONOR_PROFILE,
} from '@/infrastructure/demo'
import type { DemoData } from '@/presentation/contexts/demo-data-context'
import { DemoDataContext } from '@/presentation/contexts/demo-data-context'

/**
 * Menyediakan data contoh ke seluruh UI.
 * Composition root satu-satunya tempat yang menyentuh `infrastructure/demo`.
 */
export const DemoDataProvider = ({ children }: { readonly children: ReactNode }) => {
  const value = useMemo<DemoData>(
    () => ({
      bloodBags: DEMO_BLOOD_BAGS,
      bloodRequests: DEMO_BLOOD_REQUESTS,
      donorLocations: DEMO_DONOR_LOCATIONS,
      donorProfile: DEMO_DONOR_PROFILE,
      donationHistory: DEMO_DONATION_HISTORY,
      activeRegistration: DEMO_ACTIVE_REGISTRATION,
    }),
    [],
  )

  return <DemoDataContext.Provider value={value}>{children}</DemoDataContext.Provider>
}
