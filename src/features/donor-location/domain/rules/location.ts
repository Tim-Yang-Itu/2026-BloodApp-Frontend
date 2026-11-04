import type {
  DonorLocation,
  DonorScheduleDay,
  DonorTimeSlot,
} from '../entities/donor-location'

/** Kriteria penyaringan daftar lokasi (PDN-02, EXT-03). */
export type LocationFilter = {
  /** Kata kunci nama lokasi / alamat. */
  query?: string
  city?: string
  maxDistanceKm?: number
}

/** Sisa kursi pada satu jam layanan. */
export function remainingSeats(slot: DonorTimeSlot): number {
  return Math.max(slot.capacity - slot.reserved, 0)
}

export function isSlotFull(slot: DonorTimeSlot): boolean {
  return remainingSeats(slot) === 0
}

/** Total sisa kursi pada satu hari. */
export function remainingSeatsOfDay(day: DonorScheduleDay): number {
  return day.slots.reduce((total, slot) => total + remainingSeats(slot), 0)
}

export function findScheduleDay(
  location: DonorLocation,
  date: string,
): DonorScheduleDay | undefined {
  return location.schedule.find((day) => day.date === date)
}

/** Hari pertama yang masih punya kursi; jika semua penuh, hari pertama. */
export function firstBookableDay(location: DonorLocation): DonorScheduleDay | undefined {
  return location.schedule.find((day) => remainingSeatsOfDay(day) > 0) ?? location.schedule[0]
}

function normalize(value: string): string {
  return value.trim().toLowerCase()
}

function matchesQuery(location: DonorLocation, query: string): boolean {
  const needle = normalize(query)
  if (!needle) {
    return true
  }
  return [location.name, location.address, location.city].some((field) =>
    normalize(field).includes(needle),
  )
}

/** Terapkan filter kata kunci, kota, dan jarak maksimum. */
export function filterLocations(
  locations: readonly DonorLocation[],
  filter: LocationFilter,
): DonorLocation[] {
  return locations.filter((location) => {
    if (filter.city && normalize(location.city) !== normalize(filter.city)) {
      return false
    }
    if (typeof filter.maxDistanceKm === 'number' && location.distanceKm > filter.maxDistanceKm) {
      return false
    }
    if (filter.query && !matchesQuery(location, filter.query)) {
      return false
    }
    return true
  })
}

/** Daftar kota unik untuk pilihan filter, terurut abjad. */
export function listCities(locations: readonly DonorLocation[]): string[] {
  return [...new Set(locations.map((location) => location.city))].sort((a, b) =>
    a.localeCompare(b, 'id-ID'),
  )
}
