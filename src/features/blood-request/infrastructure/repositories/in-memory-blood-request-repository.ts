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

  private readonly listeners = new Set<() => void>()

  constructor(seed: readonly BloodRequest[] = DEMO_BLOOD_REQUESTS) {
    this.requests = seed.map((request) => ({ ...request }))
  }

  /**
   * Memberi tahu pendengar setiap kali data berubah.
   *
   * Satu repositori dibagikan ke beberapa komponen (daftar permintaan, lencana
   * sidebar, dashboard). Tanpa langganan, lencana tetap menampilkan jumlah lama
   * setelah RS mengajukan permintaan baru.
   */
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener)

    return () => {
      this.listeners.delete(listener)
    }
  }

  async findAll(): Promise<readonly BloodRequest[]> {
    return this.requests.map((request) => ({ ...request }))
  }

  async findById(requestId: string): Promise<BloodRequest | null> {
    const request = this.requests.find((item) => item.id === requestId)

    return request ? { ...request } : null
  }

  async create(request: BloodRequest): Promise<BloodRequest> {
    const created: BloodRequest = { ...request }

    this.requests = [created, ...this.requests]
    this.notify()

    return { ...created }
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
    this.notify()

    return { ...updated }
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener())
  }
}
