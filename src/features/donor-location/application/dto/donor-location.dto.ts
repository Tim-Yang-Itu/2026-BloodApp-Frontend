/** Kontrak data antara use case dan halaman. Halaman tidak menyentuh entity langsung. */

export type LocationFilterInput = {
  query?: string
  city?: string
  maxDistanceKm?: number
}

/** Ringkasan satu lokasi untuk kartu pada daftar lokasi (PDN-02). */
export type LocationSummaryDto = {
  id: string
  name: string
  typeLabel: string
  address: string
  city: string
  distanceKm: number
  /** `2,4 km` */
  distanceLabel: string
  /** `Senin sampai Sabtu, 08.00 sampai 15.00` */
  scheduleLabel: string
  /** `Kuota 18` */
  quotaLabel: string
  quotaRemaining: number
  openToday: boolean
}

export type ListLocationsResult = {
  locations: LocationSummaryDto[]
  total: number
  /** Nama kota yang sedang difilter, atau `semua kota`. */
  cityLabel: string
  cities: string[]
}

/** Satu tanggal yang bisa dipilih pada detail lokasi. */
export type ScheduleDayDto = {
  date: string
  /** `Rabu` */
  weekday: string
  /** `4 Nov` */
  shortDate: string
  /** `Rabu, 4 Nov 2026` */
  longDate: string
  remaining: number
}

/** Satu jam layanan yang bisa dipilih pada detail lokasi. */
export type TimeSlotDto = {
  id: string
  time: string
  remaining: number
  full: boolean
}

export type LocationDetailDto = {
  id: string
  name: string
  typeLabel: string
  /** `Jl. Contoh Raya No. 12, Surabaya · 2,4 km dari lokasimu` */
  addressLine: string
  openToday: boolean
  operationalDays: string
  operationalHours: string
  contact: string
  facilities: string[]
  neededBloodTypes: string[]
  schedule: ScheduleDayDto[]
  slotsByDate: Record<string, TimeSlotDto[]>
  requirements: string[]
  bringItems: string[]
  /** Query untuk membuka peta eksternal. */
  mapQuery: string
}
