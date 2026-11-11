import type { DonorLocation, DonorScheduleDay } from '../../domain/entities/donor-location'

/** Kapasitas kursi tiap jam layanan. */
const SLOT_CAPACITY = 8

const SLOT_TIMES = ['08.00', '09.00', '10.00', '11.00', '13.00', '14.00'] as const

/**
 * Membuat satu hari jadwal dari daftar sisa kursi per jam.
 * `remainingSeats[i]` dipasangkan dengan `SLOT_TIMES[i]`; nilai `0` berarti penuh.
 */
function createDay(date: string, remainingSeats: readonly number[]): DonorScheduleDay {
  return {
    date,
    slots: SLOT_TIMES.map((time, index) => ({
      id: `${date}-${time}`,
      time,
      capacity: SLOT_CAPACITY,
      reserved: SLOT_CAPACITY - (remainingSeats[index] ?? 0),
    })),
  }
}

/**
 * Data demo lokasi donor (sebelum backend tersedia).
 * Tanggal memakai pekan pertama November 2026 agar cocok dengan contoh di PRD.
 */
export const DEMO_LOCATIONS: readonly DonorLocation[] = [
  {
    id: 'utd-pmi-surabaya',
    name: 'UTD PMI Kota Surabaya',
    type: 'utd',
    address: 'Jl. Contoh Raya No. 12',
    city: 'Surabaya',
    distanceKm: 2.4,
    openToday: true,
    operationalDays: 'Senin - Sabtu',
    operationalHours: '08.00 - 15.00',
    contact: '(031) 000 0000',
    facilities: ['Parkir', 'Ruang tunggu', 'Snack'],
    neededBloodTypes: ['B-', 'AB-', 'O-', 'O+'],
    schedule: [
      createDay('2026-11-04', [3, 4, 0, 5, 0, 6]),
      createDay('2026-11-05', [5, 4, 3, 6, 0, 4]),
      createDay('2026-11-06', [2, 1, 0, 3, 2, 1]),
      createDay('2026-11-07', [6, 5, 4, 6, 3, 0]),
      createDay('2026-11-09', [4, 3, 2, 5, 3, 3]),
    ],
  },
  {
    id: 'rs-harapan-sehat',
    name: 'RS Harapan Sehat',
    type: 'rumah-sakit',
    address: 'Jl. Contoh Sehat No. 5',
    city: 'Surabaya',
    distanceKm: 2.4,
    openToday: true,
    operationalDays: 'Setiap hari',
    operationalHours: '09.00 - 14.00',
    contact: '(031) 111 2222',
    facilities: ['Parkir', 'Ruang tunggu', 'Kantin'],
    neededBloodTypes: ['A+', 'B+', 'O+'],
    schedule: [
      createDay('2026-11-04', [2, 3, 0, 4, 2, 0]),
      createDay('2026-11-05', [4, 4, 2, 3, 0, 2]),
      createDay('2026-11-06', [0, 2, 1, 2, 3, 1]),
    ],
  },
  {
    id: 'mobil-donor-balai-kota',
    name: 'Mobil Donor Balai Kota',
    type: 'mobil-donor',
    address: 'Halaman Balai Kota',
    city: 'Surabaya',
    distanceKm: 3.8,
    openToday: false,
    operationalDays: 'Sabtu',
    operationalHours: '08.00 - 12.00',
    contact: '(031) 333 4444',
    facilities: ['Tenda', 'Ruang tunggu'],
    neededBloodTypes: ['A-', 'B-', 'O-'],
    schedule: [
      createDay('2026-11-07', [2, 2, 0, 1, 0, 0]),
      createDay('2026-11-14', [3, 1, 2, 2, 0, 0]),
    ],
  },
  {
    id: 'rs-bhakti-husada',
    name: 'RS Bhakti Husada',
    type: 'rumah-sakit',
    address: 'Jl. Contoh Bhakti No. 21',
    city: 'Surabaya',
    distanceKm: 4.2,
    openToday: true,
    operationalDays: 'Senin - Jumat',
    operationalHours: '09.00 - 13.00',
    contact: '(031) 555 6666',
    facilities: ['Parkir', 'Ruang tunggu', 'Snack'],
    neededBloodTypes: ['AB+', 'B+', 'O-'],
    schedule: [
      createDay('2026-11-04', [1, 2, 3, 2, 1, 0]),
      createDay('2026-11-05', [2, 2, 2, 1, 0, 1]),
      createDay('2026-11-06', [3, 1, 1, 2, 2, 1]),
    ],
  },
  {
    id: 'rs-medika-utama',
    name: 'RS Medika Utama',
    type: 'rumah-sakit',
    address: 'Jl. Contoh Medika No. 8',
    city: 'Surabaya',
    distanceKm: 5.1,
    openToday: true,
    operationalDays: 'Senin - Sabtu',
    operationalHours: '08.00 - 14.00',
    contact: '(031) 777 8888',
    facilities: ['Parkir', 'Ruang tunggu', 'Kantin', 'Mushola'],
    neededBloodTypes: ['A+', 'AB-', 'O+'],
    schedule: [
      createDay('2026-11-04', [4, 0, 2, 3, 0, 2]),
      createDay('2026-11-05', [3, 2, 3, 2, 1, 2]),
      createDay('2026-11-06', [2, 3, 0, 4, 2, 1]),
    ],
  },
  {
    id: 'event-donor-taman-kota',
    name: 'Event Donor Taman Kota',
    type: 'event',
    address: 'Taman Kota',
    city: 'Surabaya',
    distanceKm: 6.4,
    openToday: false,
    operationalDays: 'Minggu',
    operationalHours: '07.00 - 11.00',
    contact: '(031) 999 0000',
    facilities: ['Tenda', 'Area bermain', 'Snack'],
    neededBloodTypes: ['B-', 'O-', 'O+'],
    schedule: [
      createDay('2026-11-08', [3, 3, 2, 0, 0, 0]),
      createDay('2026-11-15', [4, 2, 3, 1, 0, 0]),
    ],
  },
] as const
