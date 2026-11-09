import type { BloodType, RhesusType } from '@/shared/domain/blood'
import type { StatusTone } from '@/shared/types/status-tone'

import type { BloodBagStatus } from '../../domain/entities/blood-bag'

export type StockBagDto = {
  id: string
  bloodType: BloodType
  rhesus: RhesusType
  /** `O+`, `B−`, … */
  bloodLabel: string
  /** `Rh+` / `Rh−` */
  rhesusLabel: string
  collectedAt: string
  expiresAt: string
  collectedAtLabel: string
  expiresAtLabel: string
  status: BloodBagStatus
  statusLabel: string
  statusTone: StatusTone
  daysUntilExpiry: number
  expiringSoon: boolean
}

export type StockGroupDto = {
  bloodType: BloodType
  positive: number
  negative: number
  total: number
}

export type CriticalStockDto = {
  bloodType: BloodType
  rhesus: RhesusType
  label: string
  count: number
}

export type StockSummaryDto = {
  total: number
  expiringSoon: number
  expired: number
  groups: StockGroupDto[]
  critical: CriticalStockDto[]
}

export type CreateBloodBagInput = {
  bloodType: BloodType
  rhesus: RhesusType
  /** Tanggal kalender `yyyy-mm-dd`. */
  collectedAt: string
}
