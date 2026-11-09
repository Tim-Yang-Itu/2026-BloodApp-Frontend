import { MINIMUM_STOCK_PER_GROUP } from '@/features/blood-stock'
import type { StockGroupDto } from '@/features/blood-stock'
import type { StatusTone } from '@/shared/types/status-tone'

/**
 * Pemetaan data stok ke tampilan dashboard RS.
 *
 * Dashboard RS adalah halaman gabungan (`blood-stock` + `blood-request`), jadi
 * penerjemahan DTO ke bahasa visual halaman ini tinggal di lapisan `app` dan
 * tidak menduplikasi tipe domain milik fitur.
 */

/** Golongan dianggap menipis saat stoknya belum mencapai dua kali batas minimum. */
const LOW_STOCK_FACTOR = 2

export type StockGroupView = {
  bloodType: string
  amount: number
  positive: number
  negative: number
  /** `true` bila stok rhesus positif di bawah batas minimum. */
  positiveLow: boolean
  /** `true` bila stok rhesus negatif di bawah batas minimum. */
  negativeLow: boolean
  statusLabel: string
  tone: StatusTone
}

/** Stok satu golongan darah dianggap di bawah batas minimum. */
export function isBelowMinimum(amount: number): boolean {
  return amount < MINIMUM_STOCK_PER_GROUP
}

export function stockToneOf(total: number): StatusTone {
  if (total === 0) {
    return 'danger'
  }

  if (total < MINIMUM_STOCK_PER_GROUP) {
    return 'danger'
  }

  if (total < MINIMUM_STOCK_PER_GROUP * LOW_STOCK_FACTOR) {
    return 'warning'
  }

  return 'success'
}

export function stockStatusLabelOf(total: number): string {
  if (total === 0) {
    return 'Kosong'
  }

  if (total < MINIMUM_STOCK_PER_GROUP) {
    return 'Kritis'
  }

  if (total < MINIMUM_STOCK_PER_GROUP * LOW_STOCK_FACTOR) {
    return 'Menipis'
  }

  return 'Aman'
}

export function toStockGroups(groups: readonly StockGroupDto[]): StockGroupView[] {
  return groups.map((group) => ({
    bloodType: group.bloodType,
    amount: group.total,
    positive: group.positive,
    negative: group.negative,
    positiveLow: isBelowMinimum(group.positive),
    negativeLow: isBelowMinimum(group.negative),
    statusLabel: stockStatusLabelOf(group.total),
    tone: stockToneOf(group.total),
  }))
}
