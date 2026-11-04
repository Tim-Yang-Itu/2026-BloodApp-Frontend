import { formatBloodType } from '@/shared/domain/blood'
import { formatLongDate } from '@/shared/utils/format-date'

import type { DonorRegistration } from '../../domain/entities/donor-registration'
import { REGISTRATION_STATUS_LABEL } from '../../domain/entities/donor-registration'
import type { RegistrationDto } from '../dto/donor-registration.dto'

/** Entity → DTO. Halaman tidak pernah menyentuh entity langsung. */
export function toRegistrationDto(registration: DonorRegistration): RegistrationDto {
  return {
    id: registration.id,
    bookingCode: registration.bookingCode,
    locationId: registration.locationId,
    locationName: registration.locationName,
    locationAddress: registration.locationAddress,
    date: registration.date,
    dateLabel: formatLongDate(registration.date),
    time: registration.time,
    status: registration.status,
    statusLabel: REGISTRATION_STATUS_LABEL[registration.status],
    passedScreening: registration.passedScreening,
    donorName: registration.identity.fullName,
    bloodTypeLabel: formatBloodType(registration.identity.bloodType, registration.identity.rhesus),
    createdAt: registration.createdAt,
  }
}
