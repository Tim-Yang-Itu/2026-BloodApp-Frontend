/**
 * Entitas pengguna lintas peran.
 *
 * Sesuai PRD, satu pintu login dipakai pendonor maupun admin UTD/RS,
 * sehingga peran disimpan pada entity dan bukan pada halaman.
 */

import type { BloodType, Gender, RhesusType } from '@/shared/domain/blood'

export const USER_ROLES = ['donor', 'utd', 'hospital'] as const
export type UserRole = (typeof USER_ROLES)[number]

/*
 * Golongan darah, rhesus, dan jenis kelamin juga dipakai fitur
 * `donor-registration`, jadi definisinya ada di shared kernel dan
 * diekspor ulang di sini agar jalur impor lama tetap bekerja.
 */
export { BLOOD_TYPES, GENDERS, RHESUS_TYPES } from '@/shared/domain/blood'
export type { BloodType, Gender, RhesusType } from '@/shared/domain/blood'

/** Data dasar pendonor yang dikumpulkan saat registrasi (PDN-04). */
export type DonorProfile = {
  fullName: string
  phone: string
  /** Tanggal kalender `yyyy-mm-dd`. */
  birthDate: string
  gender: Gender
  /** `null` berarti belum diketahui. */
  bloodType: BloodType | null
  rhesus: RhesusType | null
}

/** Pengguna yang sudah terautentikasi. Tidak pernah menyimpan password. */
export type AuthUser = {
  id: string
  email: string
  role: UserRole
  profile: DonorProfile
  createdAt: string
}

/** `Nabila Firda Suryani` → `NS`, dipakai pada chip avatar header. */
export function initialsOf(fullName: string): string {
  return fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

/** `Nabila Firda Suryani` → `Nabila`, dipakai header area pendonor. */
export function shortNameOf(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? fullName
}
