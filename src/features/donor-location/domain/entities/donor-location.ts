import type { LocationType } from '../enums/location-type'

/**
 * Satu jam layanan pada satu hari donor.
 * `capacity` adalah jumlah kursi yang disediakan, `reserved` yang sudah dipesan.
 */
export type DonorTimeSlot = {
  id: string
  /** Jam mulai dalam format `HH.mm`, mis. `09.00`. */
  time: string
  capacity: number
  reserved: number
}

/** Satu hari layanan donor beserta daftar jamnya. */
export type DonorScheduleDay = {
  /** Tanggal kalender `yyyy-mm-dd`. */
  date: string
  slots: DonorTimeSlot[]
}

/**
 * Tempat donor darah (UTD/PMI, rumah sakit, mobil donor, atau event).
 * Entitas ini sengaja kaya data karena satu-satunya konsumen adalah fitur ini
 * (PDN-02 daftar lokasi, PDN-03 detail lokasi).
 */
export type DonorLocation = {
  id: string
  name: string
  type: LocationType
  address: string
  city: string
  distanceKm: number
  /** Apakah lokasi melayani donor pada hari ini. */
  openToday: boolean
  /** Hari layanan, mis. `Senin sampai Sabtu`. */
  operationalDays: string
  /** Jam layanan, mis. `08.00 sampai 15.00`. */
  operationalHours: string
  contact: string
  facilities: string[]
  /** Golongan darah yang dibutuhkan di lokasi ini, mis. `B-`. */
  neededBloodTypes: string[]
  schedule: DonorScheduleDay[]
}
