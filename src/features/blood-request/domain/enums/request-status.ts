import type { StatusTone } from '@/shared/types/status-tone'

import type { BloodRequestStatus, RequestUrgency } from '../entities/blood-request'

export const REQUEST_STATUS_LABEL: Record<BloodRequestStatus, string> = {
  pending: 'Menunggu',
  approved: 'Disetujui',
  rejected: 'Ditolak',
}

export const REQUEST_STATUS_TONE: Record<BloodRequestStatus, StatusTone> = {
  pending: 'info',
  approved: 'success',
  rejected: 'danger',
}

export const REQUEST_URGENCY_LABEL: Record<RequestUrgency, string> = {
  high: 'Tinggi',
  medium: 'Sedang',
  low: 'Rendah',
}
