import { createGetLocationDetailUseCase } from '../application/use-cases/get-location-detail.use-case'
import { createListLocationsUseCase } from '../application/use-cases/list-locations.use-case'
import { InMemoryDonorLocationRepository } from './repositories/in-memory-donor-location-repository'

/**
 * Perakitan dependensi fitur `donor-location`.
 * Dipanggil sekali dari `src/app/container.ts`, lalu hasilnya dibagikan ke halaman
 * lewat provider React — `presentation` tidak pernah menyusun dependensi sendiri.
 */
export function createDonorLocationModule() {
  const repository = new InMemoryDonorLocationRepository()

  return {
    listLocations: createListLocationsUseCase(repository),
    getLocationDetail: createGetLocationDetailUseCase(repository),
  }
}

export type DonorLocationModule = ReturnType<typeof createDonorLocationModule>
