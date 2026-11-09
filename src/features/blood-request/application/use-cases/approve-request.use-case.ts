import { BloodRequestError } from '../../domain/errors/blood-request-error'
import type { BloodRequestRepository } from '../../domain/repositories/blood-request-repository'
import { assertCanDecide } from '../../domain/rules/request-status'

export type ApproveRequestUseCase = (requestId: string) => Promise<void>

/** UTD-05: Admin UTD menyetujui permintaan rumah sakit. */
export function createApproveRequestUseCase(
  repository: BloodRequestRepository,
): ApproveRequestUseCase {
  return async (requestId) => {
    const request = await repository.findById(requestId)

    if (!request) {
      throw new BloodRequestError('not-found', 'Permintaan tidak ditemukan.')
    }

    assertCanDecide(request)
    await repository.updateStatus(requestId, { status: 'approved' })
  }
}
