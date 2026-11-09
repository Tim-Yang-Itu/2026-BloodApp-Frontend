import { formatShortDate } from '@/shared/utils/format-date'

import type { BloodBag } from '../../domain/entities/blood-bag'
import { bloodBagLabel } from '../../domain/entities/blood-bag'
import { BLOOD_BAG_STATUS_LABEL, BLOOD_BAG_STATUS_TONE } from '../../domain/enums/blood-bag-status'
import {
  resolveBagStatus,
  daysUntilExpiry,
  isExpiringSoon,
  summarizeStock,
} from '../../domain/rules/stock'
import type { StockBagDto, StockSummaryDto } from '../dto/blood-stock.dto'

export function toStockBagDto(bag: BloodBag, today: string): StockBagDto {
  const status = resolveBagStatus(bag, today)

  return {
    id: bag.id,
    bloodType: bag.bloodType,
    rhesus: bag.rhesus,
    bloodLabel: bloodBagLabel(bag.bloodType, bag.rhesus),
    rhesusLabel: bag.rhesus === 'positive' ? 'Rh+' : 'Rh−',
    collectedAt: bag.collectedAt,
    expiresAt: bag.expiresAt,
    collectedAtLabel: formatShortDate(bag.collectedAt),
    expiresAtLabel: formatShortDate(bag.expiresAt),
    status,
    statusLabel: BLOOD_BAG_STATUS_LABEL[status],
    statusTone: BLOOD_BAG_STATUS_TONE[status],
    daysUntilExpiry: daysUntilExpiry(bag, today),
    expiringSoon: isExpiringSoon(bag, today),
  }
}

export function toStockSummaryDto(bags: readonly BloodBag[], today: string): StockSummaryDto {
  const summary = summarizeStock(bags, today)

  return {
    total: summary.total,
    expiringSoon: summary.expiringSoon,
    expired: summary.expired,
    groups: summary.groups,
    critical: summary.critical.map((item) => ({
      ...item,
      label: bloodBagLabel(item.bloodType, item.rhesus),
    })),
  }
}
