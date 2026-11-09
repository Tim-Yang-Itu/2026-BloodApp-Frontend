import { formatBloodType } from '@/shared/domain/blood'
import { formatShortDate, formatTime } from '@/shared/utils/format-date'

import type { BloodRequest } from '../../domain/entities/blood-request'
import {
  REQUEST_STATUS_LABEL,
  REQUEST_STATUS_TONE,
  REQUEST_URGENCY_LABEL,
} from '../../domain/enums/request-status'
import { canDecide } from '../../domain/rules/request-status'
import type { BloodRequestDto } from '../dto/blood-request.dto'

export function toBloodRequestDto(request: BloodRequest): BloodRequestDto {
  const requestedDate = request.requestedAt.slice(0, 10)

  return {
    id: request.id,
    hospitalName: request.hospitalName,
    bloodType: request.bloodType,
    rhesus: request.rhesus,
    bloodLabel: formatBloodType(request.bloodType, request.rhesus),
    quantity: request.quantity,
    urgency: request.urgency,
    urgencyLabel: REQUEST_URGENCY_LABEL[request.urgency],
    requestedAt: request.requestedAt,
    requestedAtLabel: `${formatShortDate(requestedDate)} • ${formatTime(request.requestedAt)}`,
    status: request.status,
    statusLabel: REQUEST_STATUS_LABEL[request.status],
    statusTone: REQUEST_STATUS_TONE[request.status],
    rejectionReason: request.rejectionReason,
    canDecide: canDecide(request.status),
  }
}
