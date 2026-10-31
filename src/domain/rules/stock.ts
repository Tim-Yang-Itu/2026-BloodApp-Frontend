import type { BloodBag } from '@/domain/entities/blood-bag'
import type { BloodGroup, Rhesus, StockLevel } from '@/domain/enums/blood'
import { BLOOD_GROUPS, RHESUS_TYPES } from '@/domain/enums/blood'

/**
 * Aturan stok darah — PRD EX-01 & EX-05.
 * Murni fungsi domain: tidak tahu React, HTTP, maupun penyimpanan.
 */

const DAY_MS = 86_400_000

/** Ambang batas tampilan status stok publik (EX-05) — dapat dikonfigurasi. */
export const SAFE_STOCK_THRESHOLD = 5
export const LOW_STOCK_THRESHOLD = 2

/** Kantong dianggap mendekati kedaluwarsa bila sisa umur ≤ 7 hari (AU-03). */
export const NEAR_EXPIRY_DAYS = 7

/**
 * Kantong layak masuk stok: lolos uji, berstatus tersedia, dan belum kedaluwarsa.
 * Kantong reaktif tidak pernah dihitung (EX-01).
 */
export const isBagUsable = (bag: BloodBag, reference: Date = new Date()): boolean =>
  bag.testStatus === 'passed' &&
  bag.status === 'available' &&
  new Date(bag.expiresAt).getTime() > reference.getTime()

/** Sisa umur kantong dalam hari (dibulatkan ke atas, minimal 0). */
export const daysUntilExpiry = (bag: BloodBag, reference: Date = new Date()): number =>
  Math.max(0, Math.ceil((new Date(bag.expiresAt).getTime() - reference.getTime()) / DAY_MS))

/** Kantong masih layak tetapi sisa umurnya sudah dekat. */
export const isNearExpiry = (bag: BloodBag, reference: Date = new Date()): boolean =>
  isBagUsable(bag, reference) && daysUntilExpiry(bag, reference) <= NEAR_EXPIRY_DAYS

export const getStockLevel = (availableCount: number): StockLevel => {
  if (availableCount <= LOW_STOCK_THRESHOLD) return 'critical'
  if (availableCount < SAFE_STOCK_THRESHOLD) return 'low'
  return 'safe'
}

export interface StockByBloodType {
  readonly bloodGroup: BloodGroup
  readonly rhesus: Rhesus
  readonly available: number
  readonly level: StockLevel
}

/** Ringkasan stok per golongan + rhesus, urut sesuai urutan enum (EX-05). */
export const summarizeStockByBloodType = (
  bags: readonly BloodBag[],
  reference: Date = new Date(),
): readonly StockByBloodType[] =>
  BLOOD_GROUPS.flatMap((bloodGroup) =>
    RHESUS_TYPES.map((rhesus) => {
      const available = bags.filter(
        (bag) =>
          bag.bloodGroup === bloodGroup && bag.rhesus === rhesus && isBagUsable(bag, reference),
      ).length

      return { bloodGroup, rhesus, available, level: getStockLevel(available) }
    }),
  )
