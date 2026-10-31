import type { BloodTestStatus, StockLevel } from '@/domain/enums/blood'
import type { BloodRequestStatus, RequestUrgency } from '@/domain/enums/blood-request'
import type { BadgeTone } from '@/presentation/components/shared/StatusBadge'

/** Pemetaan status domain → warna badge agar konsisten di semua halaman. */
export const stockLevelTone = (level: StockLevel): BadgeTone => {
  if (level === 'safe') return 'success'
  if (level === 'low') return 'warning'
  return 'danger'
}

export const testStatusTone = (status: BloodTestStatus): BadgeTone => {
  if (status === 'passed') return 'success'
  if (status === 'reactive') return 'danger'
  return 'warning'
}

export const requestStatusTone = (status: BloodRequestStatus): BadgeTone => {
  if (status === 'received') return 'success'
  if (status === 'approved') return 'info'
  if (status === 'rejected') return 'danger'
  return 'warning'
}

export const urgencyTone = (urgency: RequestUrgency): BadgeTone => {
  if (urgency === 'emergency') return 'danger'
  if (urgency === 'urgent') return 'warning'
  return 'neutral'
}
