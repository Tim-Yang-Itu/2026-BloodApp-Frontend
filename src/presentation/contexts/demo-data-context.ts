import { createContext } from 'react'
import type { BloodBag } from '@/domain/entities/blood-bag'
import type { BloodRequest } from '@/domain/entities/blood-request'
import type { DonationRecord, Donor } from '@/domain/entities/donor'
import type { DonorLocationWithSchedules } from '@/domain/entities/donor-location'
import type { DonorRegistration } from '@/domain/entities/donor-registration'

/**
 * Data tampilan contoh. Aplikasi ini mode tampilan (tanpa backend), sehingga
 * semua angka dan riwayat berasal dari fixture di `infrastructure/demo`.
 * Saat backend tersedia, provider tinggal diganti pemanggilan use case.
 */
export interface DemoData {
  readonly bloodBags: readonly BloodBag[]
  readonly bloodRequests: readonly BloodRequest[]
  readonly donorLocations: readonly DonorLocationWithSchedules[]
  readonly donorProfile: Donor
  readonly donationHistory: readonly DonationRecord[]
  readonly activeRegistration: DonorRegistration
}

export const DemoDataContext = createContext<DemoData | null>(null)
