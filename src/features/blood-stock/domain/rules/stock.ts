import { BLOOD_TYPES, RHESUS_TYPES } from '@/shared/domain/blood'
import type { BloodType, RhesusType } from '@/shared/domain/blood'
import { addDays, differenceInDays } from '@/shared/utils/date'

import type { BloodBag, BloodBagStatus } from '../entities/blood-bag'

/** Ambang "hampir expired" sesuai ringkasan dashboard UTD. */
export const EXPIRING_SOON_DAYS = 7

/** Batas minimum stok per golongan + rhesus sebelum dianggap kritis. */
export const MINIMUM_STOCK_PER_GROUP = 5

/** Masa simpan kantong darah. */
export const BAG_SHELF_LIFE_DAYS = 35

/** Status efektif: kantong yang lewat tanggal kedaluwarsa otomatis dianggap expired. */
export function resolveBagStatus(bag: BloodBag, today: string): BloodBagStatus {
  if (bag.status === 'used' || bag.status === 'expired') {
    return bag.status
  }

  if (differenceInDays(today, bag.expiresAt) > 0) {
    return 'expired'
  }

  return bag.status
}

export function daysUntilExpiry(bag: BloodBag, today: string): number {
  return differenceInDays(bag.expiresAt, today)
}

export function isExpiringSoon(bag: BloodBag, today: string): boolean {
  const status = resolveBagStatus(bag, today)
  const days = daysUntilExpiry(bag, today)

  return (status === 'available' || status === 'reserved') && days >= 0 && days <= EXPIRING_SOON_DAYS
}

export type StockGroupSummary = {
  bloodType: BloodType
  positive: number
  negative: number
  total: number
}

export type CriticalStockSummary = {
  bloodType: BloodType
  rhesus: RhesusType
  count: number
}

export type StockSummary = {
  total: number
  expiringSoon: number
  expired: number
  groups: StockGroupSummary[]
  critical: CriticalStockSummary[]
}

export function summarizeStock(bags: readonly BloodBag[], today: string): StockSummary {
  const groups = BLOOD_TYPES.map((bloodType) => {
    const ofType = bags.filter((bag) => bag.bloodType === bloodType)

    return {
      bloodType,
      positive: ofType.filter((bag) => bag.rhesus === 'positive').length,
      negative: ofType.filter((bag) => bag.rhesus === 'negative').length,
      total: ofType.length,
    }
  })

  const critical = BLOOD_TYPES.flatMap((bloodType) =>
    RHESUS_TYPES.map((rhesus) => {
      const count = bags.filter(
        (bag) =>
          bag.bloodType === bloodType &&
          bag.rhesus === rhesus &&
          resolveBagStatus(bag, today) !== 'used',
      ).length

      return { bloodType, rhesus, count }
    }),
  )
    .filter((item) => item.count < MINIMUM_STOCK_PER_GROUP)
    .sort((left, right) => left.count - right.count)

  return {
    total: bags.length,
    expiringSoon: bags.filter((bag) => isExpiringSoon(bag, today)).length,
    expired: bags.filter((bag) => resolveBagStatus(bag, today) === 'expired').length,
    groups,
    critical,
  }
}

export function expiryDateFor(collectedAt: string): string {
  return addDays(collectedAt, BAG_SHELF_LIFE_DAYS)
}

/** `KD-0431` → `KD-0432`, melanjutkan nomor terbesar yang ada. */
export function nextBagId(ids: readonly string[]): string {
  const highest = ids.reduce((current, id) => {
    const match = /^KD-(\d+)$/.exec(id)
    return match ? Math.max(current, Number(match[1])) : current
  }, 0)

  return `KD-${String(highest + 1).padStart(4, '0')}`
}
