import type { BloodType, RhesusType } from '@/shared/domain/blood'
import type { StatusTone } from '@/shared/types/status-tone'

import type { BloodRequestStatus, RequestUrgency } from '../../domain/entities/blood-request'

/** Masukan form pengajuan RS-03. */
export type CreateBloodRequestInput = {
  hospitalName: string
  bloodType: BloodType
  rhesus: RhesusType
  quantity: number
  urgency: RequestUrgency
}

export type BloodRequestDto = {
  id: string
  hospitalName: string
  bloodType: BloodType
  rhesus: RhesusType
  /** `O+`, `AB−`, … */
  bloodLabel: string
  quantity: number
  urgency: RequestUrgency
  urgencyLabel: string
  requestedAt: string
  requestedAtLabel: string
  status: BloodRequestStatus
  statusLabel: string
  statusTone: StatusTone
  rejectionReason: string | null
  canDecide: boolean
}
