import type { BloodRequestRepository } from '../../domain/repositories/blood-request-repository'
import type { BloodRequestDto } from '../dto/blood-request.dto'
import { toBloodRequestDto } from '../mappers/request-mapper'

export type ListRequestsUseCase = () => Promise<BloodRequestDto[]>

/** Daftar permintaan RS, terbaru lebih dulu. */
export function createListRequestsUseCase(
  repository: BloodRequestRepository,
): ListRequestsUseCase {
  return async () => {
    const requests = await repository.findAll()

    return [...requests]
      .sort((left, right) => right.requestedAt.localeCompare(left.requestedAt))
      .map(toBloodRequestDto)
  }
}
