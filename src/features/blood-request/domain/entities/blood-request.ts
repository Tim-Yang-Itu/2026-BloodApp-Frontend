import type { BloodType, RhesusType } from '@/shared/domain/blood'

/** Alur status permintaan darah (PRD §6). */
export const REQUEST_STATUSES = ['pending', 'approved', 'rejected'] as const
export type BloodRequestStatus = (typeof REQUEST_STATUSES)[number]

export const REQUEST_URGENCIES = ['high', 'medium', 'low'] as const
export type RequestUrgency = (typeof REQUEST_URGENCIES)[number]

export type BloodRequest = {
  /** `REQ-0091` */
  id: string
  hospitalName: string
  bloodType: BloodType
  rhesus: RhesusType
  quantity: number
  urgency: RequestUrgency
  /** Waktu ISO `yyyy-mm-ddThh:mm:ss.000Z`. */
  requestedAt: string
  status: BloodRequestStatus
  rejectionReason: string | null
}
