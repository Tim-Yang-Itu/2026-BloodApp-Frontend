import { BloodRequestError } from '../../domain/errors/blood-request-error'
import type { BloodRequestRepository } from '../../domain/repositories/blood-request-repository'
import { assertCanDecide, normalizeRejectionReason } from '../../domain/rules/request-status'

export type RejectRequestUseCase = (requestId: string, reason: string) => Promise<void>

/** UTD-06: penolakan wajib menyertakan alasan untuk Admin RS. */
export function createRejectRequestUseCase(
  repository: BloodRequestRepository,
): RejectRequestUseCase {
  return async (requestId, reason) => {
    const request = await repository.findById(requestId)

    if (!request) {
      throw new BloodRequestError('not-found', 'Permintaan tidak ditemukan.')
    }

    assertCanDecide(request)
    const rejectionReason = normalizeRejectionReason(reason)

    await repository.updateStatus(requestId, { status: 'rejected', rejectionReason })
  }
}
