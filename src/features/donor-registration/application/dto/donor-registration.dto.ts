/** Kontrak data antara halaman pendaftaran donor dan use case. */

import type { BloodType, Gender, RhesusType } from '@/shared/domain/blood'

import type {
  LastDonationOption,
  RegistrationStatus,
} from '../../domain/entities/donor-registration'
import type { ScreeningAnswers } from '../../domain/rules/screening'

/** Identitas yang diisi pada langkah "Data diri". */
export type DonorIdentityInput = {
  fullName: string
  nik: string
  birthDate: string
  gender: Gender
  address: string
  phone: string
  occupation: string
  bloodType: BloodType | null
  rhesus: RhesusType | null
  weightKg: number
  lastDonation: LastDonationOption
  emergencyContactName: string
  emergencyContactPhone: string
}

export type SubmitRegistrationInput = {
  userId: string
  locationId: string
  locationName: string
  locationAddress: string
  /** Tanggal kalender `yyyy-mm-dd`. */
  date: string
  /** Jam mulai `HH.mm`. */
  time: string
  identity: DonorIdentityInput
  screening: ScreeningAnswers
}

/** Data pendaftaran siap tampil (tiket digital). */
export type RegistrationDto = {
  id: string
  bookingCode: string
  locationId: string
  locationName: string
  locationAddress: string
  date: string
  /** `Rabu, 4 Nov 2026` */
  dateLabel: string
  time: string
  status: RegistrationStatus
  statusLabel: string
  passedScreening: boolean
  donorName: string
  /** `B−` atau `Belum diketahui`. */
  bloodTypeLabel: string
  createdAt: string
}
