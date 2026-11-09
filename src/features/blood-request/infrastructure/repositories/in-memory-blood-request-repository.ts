import type {
  BloodRequest,
  BloodRequestStatus,
} from '../../domain/entities/blood-request'
import type {
  BloodRequestRepository,
  BloodRequestStatusUpdate,
} from '../../domain/repositories/blood-request-repository'
import { DEMO_BLOOD_REQUESTS } from '../demo/demo-blood-requests'

/** Versi demo: data disimpan di memori, hilang saat halaman di-refresh. */
export class InMemoryBloodRequestRepository implements BloodRequestRepository {
  private requests: BloodRequest[]

  constructor(seed: readonly BloodRequest[] = DEMO_BLOOD_REQUESTS) {
    this.requests = seed.map((request) => ({ ...request }))
  }

  async findAll(): Promise<readonly BloodRequest[]> {
    return this.requests.map((request) => ({ ...request }))
  }

  async findById(requestId: string): Promise<BloodRequest | null> {
    const request = this.requests.find((item) => item.id === requestId)

    return request ? { ...request } : null
  }

  async updateStatus(
    requestId: string,
    update: BloodRequestStatusUpdate,
  ): Promise<BloodRequest | null> {
    const index = this.requests.findIndex((item) => item.id === requestId)

    if (index < 0) {
      return null
    }

    const status: BloodRequestStatus = update.status
    const updated: BloodRequest = {
      ...this.requests[index],
      status,
      rejectionReason: update.rejectionReason ?? null,
    }

    this.requests[index] = updated

    return { ...updated }
  }
}
