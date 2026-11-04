import type { DonorLocation } from '../../domain/entities/donor-location'
import type { DonorLocationRepository } from '../../domain/repositories/donor-location-repository'
import { DEMO_LOCATIONS } from '../demo/demo-locations'

/**
 * Implementasi sementara `DonorLocationRepository` memakai data demo.
 * Saat backend tersedia, buat `HttpDonorLocationRepository` dengan kontrak yang sama
 * lalu tukar di `infrastructure/container.ts`.
 */
export class InMemoryDonorLocationRepository implements DonorLocationRepository {
  private readonly locations: readonly DonorLocation[]

  constructor(locations: readonly DonorLocation[] = DEMO_LOCATIONS) {
    this.locations = locations
  }

  async findAll(): Promise<readonly DonorLocation[]> {
    return this.locations
  }

  async findById(locationId: string): Promise<DonorLocation | null> {
    return this.locations.find((location) => location.id === locationId) ?? null
  }
}
