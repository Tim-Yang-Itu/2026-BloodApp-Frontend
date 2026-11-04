import { formatDistance, formatLongDate, formatShortDate, formatWeekday } from '@/shared/utils/format-date'

import { DONATION_BRING_ITEMS, DONATION_REQUIREMENTS } from '../../domain/constants/donation-preparation'
import { LOCATION_TYPE_LABEL } from '../../domain/enums/location-type'
import type { DonorLocationRepository } from '../../domain/repositories/donor-location-repository'
import { isSlotFull, remainingSeats, remainingSeatsOfDay } from '../../domain/rules/location'
import type { LocationDetailDto, ScheduleDayDto, TimeSlotDto } from '../dto/donor-location.dto'

/**
 * PDN-03: detail satu lokasi donor, lengkap dengan jadwal dan sisa kursi.
 * Mengembalikan `null` bila lokasi tidak ditemukan, sehingga halaman bisa
 * menampilkan keadaan kosong tanpa melempar error.
 */
export function createGetLocationDetailUseCase(repository: DonorLocationRepository) {
  return async (locationId: string): Promise<LocationDetailDto | null> => {
    const location = await repository.findById(locationId)

    if (!location) {
      return null
    }

    const slotsByDate: Record<string, TimeSlotDto[]> = {}
    const schedule: ScheduleDayDto[] = location.schedule.map((day) => {
      slotsByDate[day.date] = day.slots.map((slot) => ({
        id: slot.id,
        time: slot.time,
        remaining: remainingSeats(slot),
        full: isSlotFull(slot),
      }))

      return {
        date: day.date,
        weekday: formatWeekday(day.date),
        shortDate: formatShortDate(day.date),
        longDate: formatLongDate(day.date),
        remaining: remainingSeatsOfDay(day),
      }
    })

    return {
      id: location.id,
      name: location.name,
      typeLabel: LOCATION_TYPE_LABEL[location.type],
      addressLine: `${location.address}, ${location.city} · ${formatDistance(location.distanceKm)} dari lokasimu`,
      openToday: location.openToday,
      operationalDays: location.operationalDays,
      operationalHours: location.operationalHours,
      contact: location.contact,
      facilities: location.facilities,
      neededBloodTypes: location.neededBloodTypes,
      schedule,
      slotsByDate,
      requirements: [...DONATION_REQUIREMENTS],
      bringItems: [...DONATION_BRING_ITEMS],
      mapQuery: `${location.name}, ${location.city}`,
    }
  }
}

export type GetLocationDetail = ReturnType<typeof createGetLocationDetailUseCase>
