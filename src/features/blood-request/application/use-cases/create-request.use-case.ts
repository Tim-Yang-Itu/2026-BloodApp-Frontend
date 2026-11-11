import { BLOOD_TYPES, RHESUS_TYPES } from '@/shared/domain/blood'

import type { BloodRequest } from '../../domain/entities/blood-request'
import { REQUEST_URGENCIES } from '../../domain/entities/blood-request'
import { BloodRequestError } from '../../domain/errors/blood-request-error'
import type { BloodRequestRepository } from '../../domain/repositories/blood-request-repository'
import {
  MAX_REQUEST_QUANTITY,
  MIN_REQUEST_QUANTITY,
  isRequestQuantityInRange,
  nextRequestId,
} from '../../domain/rules/request-draft'
import type { ClockPort } from '../ports/clock-port'
import type { BloodRequestDto, CreateBloodRequestInput } from '../dto/blood-request.dto'
import { toBloodRequestDto } from '../mappers/request-mapper'

export type CreateRequestUseCase = (
  input: CreateBloodRequestInput,
) => Promise<BloodRequestDto>

/**
 * RS-03: rumah sakit mengajukan permintaan darah.
 *
 * Permintaan baru selalu masuk sebagai `pending` agar Admin UTD memverifikasi
 * ketersediaan stok sebelum menyetujuinya.
 */
export function createCreateRequestUseCase(
  repository: BloodRequestRepository,
  clock: ClockPort,
): CreateRequestUseCase {
  return async (input) => {
    const hospitalName = input.hospitalName.trim()

    if (!hospitalName) {
      throw new BloodRequestError(
        'invalid-input',
        'Akun ini belum terhubung ke rumah sakit mana pun.',
      )
    }

    if (!BLOOD_TYPES.includes(input.bloodType)) {
      throw new BloodRequestError('invalid-input', 'Golongan darah tidak dikenal.')
    }

    if (!RHESUS_TYPES.includes(input.rhesus)) {
      throw new BloodRequestError('invalid-input', 'Rhesus darah tidak dikenal.')
    }

    if (!isRequestQuantityInRange(input.quantity)) {
      throw new BloodRequestError(
        'invalid-input',
        `Jumlah kantong harus ${MIN_REQUEST_QUANTITY}–${MAX_REQUEST_QUANTITY} kantong.`,
      )
    }

    if (!REQUEST_URGENCIES.includes(input.urgency)) {
      throw new BloodRequestError('invalid-input', 'Tingkat urgensi tidak dikenal.')
    }

    const existing = await repository.findAll()
    const request: BloodRequest = {
      id: nextRequestId(existing.map((item) => item.id)),
      hospitalName,
      bloodType: input.bloodType,
      rhesus: input.rhesus,
      quantity: input.quantity,
      urgency: input.urgency,
      requestedAt: clock.nowIso(),
      status: 'pending',
      rejectionReason: null,
    }

    const created = await repository.create(request)

    return toBloodRequestDto(created)
  }
}
