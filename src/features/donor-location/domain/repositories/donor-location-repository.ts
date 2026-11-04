import type { DonorLocation } from '../entities/donor-location'

/**
 * Kontrak penyimpanan lokasi donor.
 * Implementasi in-memory ada di `infrastructure/repositories`, nanti bisa diganti
 * versi HTTP tanpa mengubah use case maupun halaman.
 */
export type DonorLocationRepository = {
  findAll(): Promise<readonly DonorLocation[]>
  findById(locationId: string): Promise<DonorLocation | null>
}
