import type { BloodType, RhesusType } from '@/shared/domain/blood'

/**
 * Status kantong darah.
 * `expired` bisa berasal dari data tersimpan atau dihitung dari tanggal kedaluwarsa.
 */
export const BLOOD_BAG_STATUSES = ['available', 'reserved', 'used', 'expired'] as const
export type BloodBagStatus = (typeof BLOOD_BAG_STATUSES)[number]

export type BloodBag = {
  /** `KD-0431` */
  id: string
  bloodType: BloodType
  rhesus: RhesusType
  /** Tanggal kalender `yyyy-mm-dd`. */
  collectedAt: string
  /** Tanggal kalender `yyyy-mm-dd`. */
  expiresAt: string
  status: BloodBagStatus
}

/** `('B', 'negative')` → `B−`. */
export function bloodBagLabel(bloodType: BloodType, rhesus: RhesusType): string {
  return `${bloodType}${rhesus === 'negative' ? '−' : '+'}`
}
