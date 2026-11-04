import { formatDistance } from '@/shared/utils/format-date'

import type { DonorLocation } from '../../domain/entities/donor-location'
import { LOCATION_TYPE_LABEL } from '../../domain/enums/location-type'
import type { DonorLocationRepository } from '../../domain/repositories/donor-location-repository'
import { filterLocations, firstBookableDay, listCities, remainingSeatsOfDay } from '../../domain/rules/location'
import type { ListLocationsResult, LocationFilterInput, LocationSummaryDto } from '../dto/donor-location.dto'

function toSummary(location: DonorLocation): LocationSummaryDto {
  const day = firstBookableDay(location)
  const remaining = day ? remainingSeatsOfDay(day) : 0

  return {
    id: location.id,
    name: location.name,
    typeLabel: LOCATION_TYPE_LABEL[location.type],
    address: location.address,
    city: location.city,
    distanceKm: location.distanceKm,
    distanceLabel: formatDistance(location.distanceKm),
    scheduleLabel: `${location.operationalDays}, ${location.operationalHours}`,
    quotaLabel: `Kuota ${remaining}`,
    quotaRemaining: remaining,
    openToday: location.openToday,
  }
}

/**
 * PDN-02 + EXT-03: daftar lokasi donor dengan filter kata kunci, kota, dan jarak.
 */
export function createListLocationsUseCase(repository: DonorLocationRepository) {
  return async (input: LocationFilterInput = {}): Promise<ListLocationsResult> => {
    const allLocations = await repository.findAll()
    const city = input.city?.trim() ? input.city.trim() : undefined
    const filtered = filterLocations(allLocations, {
      query: input.query,
      city,
      maxDistanceKm: input.maxDistanceKm,
    })

    return {
      locations: filtered.map(toSummary),
      total: filtered.length,
      cityLabel: city ?? 'semua kota',
      cities: listCities(allLocations),
    }
  }
}

export type ListLocations = ReturnType<typeof createListLocationsUseCase>
