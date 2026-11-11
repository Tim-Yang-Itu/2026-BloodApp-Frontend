import type { BloodRequest, BloodRequestStatus } from '../entities/blood-request'

export type BloodRequestStatusUpdate = {
  status: Exclude<BloodRequestStatus, 'pending'>
  rejectionReason?: string | null
}

/** Kontrak penyimpanan permintaan darah dari rumah sakit. */
export type BloodRequestRepository = {
  findAll(): Promise<readonly BloodRequest[]>
  findById(requestId: string): Promise<BloodRequest | null>
  create(request: BloodRequest): Promise<BloodRequest>
  updateStatus(requestId: string, update: BloodRequestStatusUpdate): Promise<BloodRequest | null>
}
