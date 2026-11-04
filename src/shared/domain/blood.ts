/**
 * Shared kernel: nilai yang dipakai lebih dari satu fitur.
 *
 * Golongan darah, rhesus, dan jenis kelamin muncul di `auth` (profil pendonor)
 * maupun `donor-registration` (identitas saat donor). Menaruhnya di sini
 * membuat kedua fitur tidak perlu saling mengimpor — `shared/` tidak boleh
 * mengetahui `features/`.
 */

export const BLOOD_TYPES = ['A', 'B', 'AB', 'O'] as const
export type BloodType = (typeof BLOOD_TYPES)[number]

export const RHESUS_TYPES = ['positive', 'negative'] as const
export type RhesusType = (typeof RHESUS_TYPES)[number]

export const GENDERS = ['male', 'female'] as const
export type Gender = (typeof GENDERS)[number]

export const GENDER_LABEL: Record<Gender, string> = {
  male: 'Laki-laki',
  female: 'Perempuan',
}

export const RHESUS_LABEL: Record<RhesusType, string> = {
  positive: 'Positif (+)',
  negative: 'Negatif (−)',
}

/** `('B', 'negative')` → `B−`; `null` → `Belum diketahui`. */
export function formatBloodType(
  bloodType: BloodType | null,
  rhesus: RhesusType | null,
): string {
  if (!bloodType) {
    return 'Belum diketahui'
  }

  if (!rhesus) {
    return `${bloodType} (rhesus belum diketahui)`
  }

  return `${bloodType}${rhesus === 'negative' ? '−' : '+'}`
}
