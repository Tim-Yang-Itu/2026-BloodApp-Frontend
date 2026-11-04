/**
 * Data yang dikumpulkan pada form donor (PDN-05) sebelum peserta datang ke lokasi.
 * Disimpan sebagai bagian dari pendaftaran agar petugas bisa memverifikasi.
 */

import type { BloodType, Gender, RhesusType } from '@/shared/domain/blood'

export const REGISTRATION_STATUSES = ['scheduled', 'completed', 'cancelled'] as const
export type RegistrationStatus = (typeof REGISTRATION_STATUSES)[number]

export const REGISTRATION_STATUS_LABEL: Record<RegistrationStatus, string> = {
  scheduled: 'Terjadwal',
  completed: 'Selesai',
  cancelled: 'Dibatalkan',
}

export const LAST_DONATION_OPTIONS = [
  { value: 'never', label: 'Belum pernah' },
  { value: 'over-24-months', label: 'Lebih dari 2 tahun lalu' },
  { value: 'within-24-months', label: '6 sampai 24 bulan lalu' },
  { value: 'within-6-months', label: 'Kurang dari 6 bulan lalu' },
] as const

export type LastDonationOption = (typeof LAST_DONATION_OPTIONS)[number]['value']

export const LAST_DONATION_LABEL: Record<LastDonationOption, string> = {
  never: 'Belum pernah',
  'over-24-months': 'Lebih dari 2 tahun lalu',
  'within-24-months': '6 sampai 24 bulan lalu',
  'within-6-months': 'Kurang dari 6 bulan lalu',
}

/** Identitas calon pendonor sesuai kartu identitas. */
export type DonorIdentity = {
  fullName: string
  /** Nomor KTP, 16 digit. */
  nik: string
  /** Tanggal kalender `yyyy-mm-dd`. */
  birthDate: string
  gender: Gender
  address: string
  phone: string
  /** Boleh kosong. */
  occupation: string
  /** `null` berarti belum diketahui. */
  bloodType: BloodType | null
  rhesus: RhesusType | null
  weightKg: number
  lastDonation: LastDonationOption
  emergencyContactName: string
  emergencyContactPhone: string
}

/**
 * Satu pendaftaran donor beserta tiket digitalnya.
 * `bookingCode` dipakai petugas untuk mencari peserta saat tiba di lokasi.
 */
export type DonorRegistration = {
  id: string
  bookingCode: string
  userId: string
  locationId: string
  locationName: string
  locationAddress: string
  /** Tanggal kalender `yyyy-mm-dd`. */
  date: string
  /** Jam mulai `HH.mm`, mis. `09.00`. */
  time: string
  status: RegistrationStatus
  /** Hasil evaluasi jawaban screening saat form dikirim. */
  passedScreening: boolean
  identity: DonorIdentity
  createdAt: string
}
