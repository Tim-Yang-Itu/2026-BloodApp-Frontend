import type { BloodRequest, BloodRequestStatus } from '../entities/blood-request'
import { BloodRequestError } from '../errors/blood-request-error'

/** Hanya permintaan berstatus menunggu yang bisa diputuskan Admin UTD. */
export function canDecide(status: BloodRequestStatus): boolean {
  return status === 'pending'
}

export function assertCanDecide(request: BloodRequest): void {
  if (!canDecide(request.status)) {
    throw new BloodRequestError(
      'invalid-transition',
      'Permintaan ini sudah diproses sebelumnya.',
    )
  }
}

/** Alasan penolakan wajib diisi dan dikirim ke Admin RS. */
export function normalizeRejectionReason(reason: string): string {
  const trimmed = reason.trim()

  if (!trimmed) {
    throw new BloodRequestError('reason-required', 'Alasan penolakan wajib diisi.')
  }

  return trimmed
}
